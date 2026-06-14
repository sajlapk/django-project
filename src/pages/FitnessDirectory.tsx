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
  amenities: string[];
  hours: string;
  membership: string;
  image: string;
  distance_km?: number;
}

const getImageUrl = (url: string | null) => {
  if (!url) return "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400";
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  
  // Extract backend base (without /api/v1)
  const base = API_BASE_URL.replace('/api/v1', '');
  // Ensure we don't have double slashes
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${base}${cleanUrl}`;
};

const FitnessDirectory = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [gyms, setGyms] = useState<GymItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [userCoords, setUserCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'loading' | 'granted' | 'denied'>('loading');

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

  // Step 1: Get user's GPS coordinates
  useEffect(() => {
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
          console.warn('Location permission denied or unavailable:', error);
          setLocationStatus('denied');
        },
        { timeout: 8000, enableHighAccuracy: false }
      );
    } else {
      setLocationStatus('denied');
    }
  }, []);

  // Step 2: Fetch gyms (location-wise if coordinates available)
  useEffect(() => {
    if (locationStatus === 'loading') return;

    const fetchGyms = async () => {
      try {
        let url = `${API_BASE_URL}/customer/fitnesscenter/`;
        if (userCoords) {
          url += `?lat=${userCoords.lat}&lon=${userCoords.lon}&radius_km=100000`;
        } else {
          url += `?page_size=1000`;
        }

        const response = await axios.get(url);
        const list = response.data.results || response.data;
        if (Array.isArray(list) && list.length > 0) {
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
              rating: Number(g.average_rating) || 4.8,
              reviews: g.review_count || 0,
              category: g.categories?.[0]?.name || 'Gym',
              amenities: g.amenities?.map((a: any) => a.name) || ["Free Weights", "Cardio Units", "Trainer Guided"],
              hours: "6:00 AM - 10:00 PM",
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
  }, [locationStatus, userCoords]);

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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50 text-black  sm: h-[15rem] md: h-[15rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Fitness <span className="text-red-500">Directory</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600">
              {userCoords
                ? 'Showing fitness centers nearest to your current location'
                : 'Find the perfect fitness center that matches your goals and lifestyle'}
            </p>
            {userCoords && (
              <div className="inline-flex items-center gap-1.5 mt-4 px-4 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-full border border-emerald-200">
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
          
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search fitness centers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
              />
            </div>
            {searchTerm && (
              <div className="mt-2 text-gray-600 text-sm">
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
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category
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
            {filteredDirectories.map((directory) => (
              <div
                key={directory.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={directory.image}
                    alt={directory.name}
                    className="w-full h-48 object-contain bg-gray-100"
                  />
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
                  
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {directory.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                      <span className="text-sm">{directory.address}</span>
                    </div>
                    {directory.phone && (
                      <div className="flex items-center text-gray-700">
                        <Phone className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                        <span className="text-sm">{directory.phone}</span>
                      </div>
                    )}
                    {directory.hours && (
                      <div className="flex items-center text-gray-700">
                        <Clock className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                        <span className="text-sm">{directory.hours}</span>
                      </div>
                    )}
                    <div className="flex items-center text-gray-700">
                      <Users className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                      <span className="text-sm">{directory.reviews} reviews</span>
                    </div>
                  </div>
                  
                  {directory.amenities && directory.amenities.length > 0 && (
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
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/gym/${directory.id}/${slugify(directory.name || 'gym')}`)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors duration-200 text-sm"
                    >
                      View Details
                    </button>
                    {directory.phone && (
                      <a
                        href={`tel:${directory.phone}`}
                        className="px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200 text-sm flex items-center justify-center"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FitnessDirectory;