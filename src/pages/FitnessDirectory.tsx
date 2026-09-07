import React, { useState, useEffect } from 'react';
import { MapPin, Star, Phone, Clock, Dumbbell, Users, Filter, Search, Loader, Navigation } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { useNavigate } from 'react-router-dom';

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start
    .replace(/-+$/, '');            // Trim - from end
};

interface GymItem {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  rating: number;
  reviews: number;
  category: string;
  categories?: string[];
  amenities: string[];
  hours?: string;
  hoursNode?: React.ReactNode;
  rawGym?: any;
  membership: string;
  image: string;
  distance_km?: number;
}

const getImageUrl = (url: string | null) => {
  if (!url) return "";
  if (url.startsWith('http://') || url.startsWith('https://')) return url;

  // Extract backend base (without /api/v1)
  const base = API_BASE_URL.replace('/api/v1', '');
  // Ensure we don't have double slashes
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${base}${cleanUrl}`;
};

const formatTimeStr = (t: string, forcePM: boolean = false) => {
  if (!t) return '';
  try {
    let [h, m] = t.split(':').map(Number);
    if (forcePM && h < 12) h += 12;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
  } catch {
    return t;
  }
};

const getGymHours = (g: any): React.ReactNode => {
  if (g.working_days && g.working_days.length > 0) {
    const openDays = g.working_days.filter((d: any) => d.is_open);
    if (openDays.length > 0) {
      return (
        <div className="flex flex-col gap-1 w-full mt-1">
          {openDays.map((wd: any) => {
            let times = [];
            if (wd.morning_opening_time && wd.morning_closing_time) {
              times.push(`M: ${formatTimeStr(wd.morning_opening_time)} - ${formatTimeStr(wd.morning_closing_time, true)}`);
            }
            if (wd.evening_opening_time && wd.evening_closing_time) {
              times.push(`E: ${formatTimeStr(wd.evening_opening_time, true)} - ${formatTimeStr(wd.evening_closing_time, true)}`);
            }
            if (wd.ladies_opening_time && wd.ladies_closing_time) {
              times.push(`L: ${formatTimeStr(wd.ladies_opening_time, true)} - ${formatTimeStr(wd.ladies_closing_time, true)}`);
            }
            if (times.length === 0) return null;
            return (
              <div key={wd.id || wd.day} className="flex justify-between items-start text-[11px] border-b border-gray-100 last:border-0 pb-1">
                <span className="font-semibold capitalize text-gray-700 w-10">{wd.day.substring(0, 3)}:</span>
                <div className="flex flex-col flex-1 text-right text-gray-500">
                  {times.map((t, idx) => (
                    <span key={idx}>{t}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  if (g.opening_time && g.closing_time) {
    return `${formatTimeStr(g.opening_time)} - ${formatTimeStr(g.closing_time)}`;
  }
  if (g.time_slots && g.time_slots.length > 0) {
    const sorted = [...g.time_slots].sort((a, b) => a.start_time.localeCompare(b.start_time));
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    return `${formatTimeStr(first.start_time)} - ${formatTimeStr(last.end_time)}`;
  }
  return "Hours not available";
};

const GymHoursDropdown = ({ gym }: { gym: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const content = getGymHours(gym);

  if (typeof content === 'string' && content === "Hours not available") {
    return <span className="text-sm text-gray-500">{content}</span>;
  }

  return (
    <div className="w-full relative z-10" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center justify-between w-full text-[13px] font-semibold text-gray-700 hover:text-red-500 transition-colors focus:outline-none"
      >
        <span>View Weekly Schedule</span>
        <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </button>
      {isOpen && (
        <div className="mt-2 pt-2 border-t border-gray-200 animate-fade-in">
          {content}
        </div>
      )}
    </div>
  );
};

const FitnessDirectory = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [gyms, setGyms] = useState<GymItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [userCoords, setUserCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'granted' | 'denied'>('idle');
  const [sortByNearest, setSortByNearest] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const defaultMockGyms: GymItem[] = [
    {
      id: 1,
      name: "Iron Paradise Gym",
      description: "State-of-the-art equipment and professional trainers for serious fitness enthusiasts. Specializing in strength training and bodybuilding.",
      address: "123 Muscle Street, Downtown",
      phone: "(555) 123-4567",
      rating: 4.8,
      reviews: 245,
      category: "Gym",
      amenities: ["Free Weights", "Cardio Equipment", "Personal Training", "Locker Rooms"],
      hours: "5:00 AM - 11:00 PM",
      membership: "₹49/month",
      image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      name: "Zen Wellness Studio",
      description: "Peaceful environment focused on yoga, meditation, and holistic wellness practices. Perfect for mind-body connection.",
      address: "456 Serenity Lane, Uptown",
      phone: "(555) 987-6543",
      rating: 4.9,
      reviews: 189,
      category: "Yoga",
      amenities: ["Yoga Classes", "Meditation Room", "Massage Therapy", "Wellness Workshops"],
      hours: "6:00 AM - 9:00 PM",
      membership: "₹79/month",
      image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      name: "CrossFit Beast Mode",
      description: "High-intensity functional fitness training with experienced coaches. Build strength, endurance, and community.",
      address: "789 Power Avenue, Industrial District",
      phone: "(555) 456-7890",
      rating: 4.7,
      reviews: 156,
      category: "CrossFit",
      amenities: ["CrossFit Classes", "Olympic Lifting", "Metabolic Conditioning", "Nutrition Coaching"],
      hours: "5:30 AM - 10:00 PM",
      membership: "₹129/month",
      image: "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 4,
      name: "AquaFit Swimming Center",
      description: "Olympic-sized pool with swimming lessons, water aerobics, and competitive training programs for all ages.",
      address: "321 Splash Boulevard, Riverside",
      phone: "(555) 234-5678",
      rating: 4.6,
      reviews: 203,
      category: "Swimming",
      amenities: ["Olympic Pool", "Kids Pool", "Swimming Lessons", "Water Aerobics"],
      hours: "5:00 AM - 10:00 PM",
      membership: "₹65/month",
      image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 5,
      name: "FlexFit 24/7",
      description: "Round-the-clock access to modern fitness equipment and group classes. Perfect for busy schedules and night owls.",
      address: "654 Fitness Way, Central Plaza",
      phone: "(555) 345-6789",
      rating: 4.5,
      reviews: 312,
      category: "Gym",
      amenities: ["24/7 Access", "Group Classes", "Cardio Theater", "Smoothie Bar"],
      hours: "24/7",
      membership: "₹39/month",
      image: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 6,
      name: "Dance Revolution Studio",
      description: "Dynamic dance fitness classes including Zumba, hip-hop, ballet, and contemporary dance for all skill levels.",
      address: "987 Rhythm Street, Arts District",
      phone: "(555) 567-8901",
      rating: 4.8,
      reviews: 178,
      category: "Dance",
      amenities: ["Dance Classes", "Private Lessons", "Performance Opportunities", "Mirrored Studios"],
      hours: "9:00 AM - 10:00 PM",
      membership: "₹55/month",
      image: "https://images.pexels.com/photos/3775593/pexels-photo-3775593.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 7,
      name: "Peak Performance Athletics",
      description: "Sports-specific training facility with professional coaches for athletes and sports enthusiasts of all levels.",
      address: "147 Champion Drive, Sports Complex",
      phone: "(555) 678-9012",
      rating: 4.9,
      reviews: 134,
      category: "Sports Training",
      amenities: ["Sports Training", "Performance Testing", "Recovery Center", "Nutrition Planning"],
      hours: "6:00 AM - 9:00 PM",
      membership: "₹99/month",
      image: "https://images.pexels.com/photos/2827400/pexels-photo-2827400.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 8,
      name: "Mindful Movement Pilates",
      description: "Classical and contemporary Pilates instruction focusing on core strength, flexibility, and body alignment.",
      address: "258 Balance Street, Wellness Quarter",
      phone: "(555) 789-0123",
      rating: 4.7,
      reviews: 167,
      category: "Pilates",
      amenities: ["Pilates Classes", "Reformer Training", "Mat Classes", "Physical Therapy"],
      hours: "7:00 AM - 8:00 PM",
      membership: "₹89/month",
      image: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  // Step 1: Get user's GPS coordinates conditionally
  useEffect(() => {
    if (sortByNearest && !userCoords) {
      setLocationStatus('loading');
      setLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserCoords({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
            setLocationStatus('granted');
          },
          (error) => {
            console.warn('Location permission denied or unavailable, using fallback Kozhikode coordinates:', error);
            setUserCoords({ lat: 11.2588, lon: 75.7804 });
            setLocationStatus('granted');
          },
          { timeout: 8000, enableHighAccuracy: false }
        );
      } else {
        console.warn('Geolocation not supported, using fallback Kozhikode coordinates');
        setUserCoords({ lat: 11.2588, lon: 75.7804 });
        setLocationStatus('granted');
      }
    } else if (!sortByNearest) {
      setLocationStatus('idle');
    }
  }, [sortByNearest, userCoords]);

  // Step 2: Fetch gyms (location-wise if coordinates available and sortByNearest active)
  useEffect(() => {
    if (sortByNearest && locationStatus === 'loading') return;

    const fetchGyms = async () => {
      setLoading(true);
      try {
        let url = sortByNearest
          ? `${API_BASE_URL}/customer/nearest/fitnesscenter/`
          : `${API_BASE_URL}/fitnesscenter/gym/list/`;
        if (sortByNearest && userCoords) {
          url += `?lat=${userCoords.lat}&lon=${userCoords.lon}&radius_km=100000`;
        } else {
          url += `?page_size=1000`;
        }

        const response = await axios.get(url, {
          headers: { 'X-Platform': 'admin-web' }
        });
        let list = response.data.results || response.data;
        
        if (Array.isArray(list) && list.length > 0) {
          // --- FIX FOR DATABASE TIME ---
          // Because the /gym/list/ API does NOT return 'working_days' or 'time_slots',
          // we MUST fetch the details of each gym individually to display the correct database time!
          list = await Promise.all(list.map(async (g: any) => {
            try {
              const detailResp = await axios.get(`${API_BASE_URL}/fitnesscenter/gym/${g.id}/`, {
                headers: { 'X-Platform': 'admin-web' }
              });
              const gymData = detailResp.data.data || detailResp.data;
              return { 
                ...g, 
                working_days: gymData.working_days, 
                time_slots: gymData.time_slots,
                opening_time: gymData.opening_time,
                closing_time: gymData.closing_time
              };
            } catch (e) {
              return g; // fallback to list data
            }
          }));

          const mapped = list.map((g: any) => {
            const city = g.location?.city || '';
            const state = g.location?.state || '';
            const building = g.location?.building_name || '';
            const addr = [building, city, state].filter(Boolean).join(', ') || 'Bangalore, India';
            const packageItem = g.packages?.[0];
            const price = packageItem ? (packageItem.offer_price || packageItem.actual_price || packageItem.price) : null;
            const priceVal = price ? `₹${parseInt(price)}/month` : "";
            return {
              id: g.id,
              name: g.name,
              description: g.description || 'Premium fitness arena designed for peak performance training.',
              address: addr,
              phone: g.phone_number || '+91 99000 12345',
              rating: Number(g.average_rating) || 0.0,
              reviews: g.review_count || 0,
              category: g.category?.[0]?.name || g.categories?.[0]?.name || 'Gym',
              categories: g.categories?.map((c: any) => c.name) || (g.category ? (Array.isArray(g.category) ? g.category.map((c: any) => c.name) : [g.category.name || 'Gym']) : ['Gym']),
              amenities: g.amenities?.map((a: any) => a.name) || ["Free Weights", "Cardio Units", "Trainer Guided"],
              rawGym: g,
              membership: priceVal,
              image: getImageUrl(g.logo),
              distance_km: g.distance_km ?? undefined,
            };
          });
          setGyms(mapped);
        } else {
          setGyms(defaultMockGyms);
        }
      } catch (err) {
        console.warn("Failed to fetch from Django API, falling back to mock dataset:", err);
        setGyms(defaultMockGyms);
      } finally {
        setLoading(false);
      }
    };
    fetchGyms();
  }, [locationStatus, userCoords, sortByNearest]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/fitnesscenter/categories/`, {
          headers: { 'X-Platform': 'admin-web' }
        });
        const list = response.data.results || response.data;
        if (Array.isArray(list)) {
          setCategories(['All', ...list.map((c: any) => c.name)]);
        }
      } catch (err) {
        console.warn("Failed to fetch categories from Django API, using defaults:", err);
        setCategories(['All', 'Gym', 'Yoga', 'CrossFit', 'Swimming', 'Dance', 'Sports Training', 'Pilates']);
      }
    };
    fetchCategories();
  }, []);

  const filteredDirectories = gyms.filter(directory => {
    const matchesCategory = selectedCategory === 'All' || directory.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = searchTerm === '' ||
      directory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      directory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      directory.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      directory.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      directory.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Gym': 'bg-red-100 text-red-800',
      'Yoga': 'bg-green-100 text-green-800',
      'CrossFit': 'bg-orange-100 text-orange-800',
      'Swimming': 'bg-blue-100 text-blue-800',
      'Dance': 'bg-pink-100 text-pink-800',
      'Sports Training': 'bg-purple-100 text-purple-800',
      'Pilates': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-10 pb-6 md:pt-16 md:pb-10 bg-white text-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-left max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
              </span>
              <span className="text-red-600 text-sm font-bold tracking-[0.2em] uppercase">
                Fitness Centers
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-black">
              Explore <span className="text-red-600">centers near you.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
              {userCoords
                ? 'Showing a sample of gyms and training spaces nearest to your location.'
                : 'A sample of the gyms, studios, and training spaces listed on the Customer App. Real partner listings go live as centers onboard.'}
            </p>

            {userCoords && (
              <div className="inline-flex items-center gap-1.5 mt-6 px-4 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-full border border-emerald-200">
                <Navigation className="w-4 h-4" />
                Sorted by distance from your location
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">
              Browse Fitness Centers
            </h2>
            <div className="flex items-center text-gray-600">
              <Filter className="w-5 h-5 mr-2" />
              <span>{filteredDirectories.length} results</span>
            </div>
          </div>

          {/* Search & Location Bar */}
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search fitness centers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
              />
            </div>

            <button
              type="button"
              onClick={() => setSortByNearest(!sortByNearest)}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold border transition-all ${sortByNearest
                ? 'bg-red-500 text-white border-red-500 shadow-md hover:bg-red-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
            >
              <Navigation className={`w-4 h-4 ${sortByNearest ? 'animate-pulse' : ''}`} />
              {sortByNearest ? 'Nearest Location: Active' : 'Nearest Location'}
            </button>

            {searchTerm && (
              <div className="text-gray-600 text-sm md:ml-auto">
                Found {filteredDirectories.length} center{filteredDirectories.length !== 1 ? 's' : ''} matching "{searchTerm}"
              </div>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${selectedCategory === category
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Loader className="w-12 h-12 text-red-500 animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Fetching fitness centers from database...</p>
            </div>
          ) : filteredDirectories.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Dumbbell className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No fitness centers found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== 'All'
                  ? 'No centers match your current filters. Try adjusting your search or category selection.'
                  : 'No fitness centers available at the moment.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDirectories.slice(0, visibleCount).map((directory) => (
                <div
                  key={directory.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative">
                    {directory.image ? (
                      <img
                        src={directory.image}
                        alt={directory.name}
                        className="w-full h-48 object-cover bg-gray-100"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center text-gray-400 gap-2 border-b">
                        <Dumbbell className="w-12 h-12 text-gray-300" />
                        <span className="text-xs text-gray-400">No Image Available</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(directory.category)}`}>
                        {directory.category}
                      </span>
                    </div>
                    {directory.membership && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-lg font-bold text-red-500">{directory.membership}</span>
                      </div>
                    )}
                    {directory.distance_km !== undefined && (
                      <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Navigation className="w-3 h-3 text-emerald-400" />
                        <span className="text-white text-xs font-bold">{directory.distance_km} km</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-black">
                        {directory.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700 ml-1">
                          {directory.rating}
                        </span>
                      </div>
                    </div>

                    {/* <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                      {directory.description}
                    </p> */}

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-700">
                        <MapPin className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                        <span className="text-sm">{directory.address}</span>
                      </div>
                      {/* directory.phone && (
                        <div className="flex items-center text-gray-700">
                          <Phone className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                          <span className="text-sm">{directory.phone}</span>
                        </div>
                      ) */}
                      {directory.rawGym && (
                  <div className="flex items-start mt-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <Clock size={16} className="mr-2 text-red-500 flex-shrink-0 relative top-[2px]" />
                    <div className="w-full">
                      <GymHoursDropdown gym={directory.rawGym} />
                    </div>
                  </div>
                )}      
                      {/* <div className="flex items-center text-gray-700">
                        <Users className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                        <span className="text-sm">{directory.reviews} reviews</span>
                      </div> */}
                    </div>

                    {(directory.categories && directory.categories.length > 0) ? (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2">Categories included:</h4>
                        <div className="flex flex-wrap gap-1">
                          {directory.categories.slice(0, 3).map((cat, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {cat}
                            </span>
                          ))}
                          {directory.categories.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{directory.categories.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (directory.amenities && directory.amenities.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2">Amenities:</h4>
                        <div className="flex flex-wrap gap-1">
                          {directory.amenities.slice(0, 3).map((amenity, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {amenity}
                            </span>
                          ))}
                          {directory.amenities.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{directory.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/gym/${directory.id}/${slugify(directory.name || 'gym')}`)}
                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors duration-200 text-sm"
                      >
                        View Details
                      </button>
                      {/* directory.phone && (
                        <a
                          href={`tel:${directory.phone}`}
                          className="px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200 text-sm flex items-center justify-center"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      ) */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {filteredDirectories.length > visibleCount && !loading && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 9)}
                className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-red-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                See More
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FitnessDirectory;