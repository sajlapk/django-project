import React, { useState, useEffect } from 'react';
import { MapPin, Star, Phone, Clock, Dumbbell, Users, ArrowRight, Loader } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { useNavigate } from 'react-router-dom';

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
}

const FitnessCenterSection = () => {
  const navigate = useNavigate();
  const [gyms, setGyms] = useState<GymItem[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultMockGyms: GymItem[] = [
    {
      id: 1,
      name: "Powerhouse Gym",
      description: "Equipped with state-of-the-art strength training machinery and professional trainers to assist your journey.",
      address: "123 Fitness Ave, Sector 4, Bangalore",
      phone: "+91 98765 43210",
      rating: 4.8,
      reviews: 124,
      category: "Gym",
      amenities: ["Steam Bath", "Personal Training", "Cardio Zone", "Strength Equipment"],
      hours: "5:00 AM - 10:00 PM",
      membership: "₹49/month",
      image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      name: "Serenity Yoga Studio",
      description: "Find your inner peace and strength. Hatha, Vinyasa, and meditation classes led by certified instructors.",
      address: "45 Wellness Blvd, Indiranagar, Bangalore",
      phone: "+91 98765 43211",
      rating: 4.9,
      reviews: 89,
      category: "Yoga",
      amenities: ["Yoga Mats", "Shower Facilities", "Meditation Hall", "Juice Bar"],
      hours: "6:00 AM - 8:00 PM",
      membership: "₹59/month",
      image: "https://images.pexels.com/photos/3822689/pexels-photo-3822689.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      name: "Ironclad CrossFit",
      description: "High-intensity functional training designed to push your limits. Join our supportive community today.",
      address: "89 Gymkhana Rd, Koramangala, Bangalore",
      phone: "+91 98765 43212",
      rating: 4.7,
      reviews: 156,
      category: "CrossFit",
      amenities: ["Olympic Lifting", "Rowing Machines", "Assault Bikes", "Locker Rooms"],
      hours: "6:00 AM - 9:00 PM",
      membership: "₹69/month",
      image: "https://images.pexels.com/photos/949126/pexels-photo-949126.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/fitnesscenter/gym/list/?page_size=6`);
        const list = response.data.results || response.data;
        if (Array.isArray(list) && list.length > 0) {
          const mapped = list.map((g: any) => {
            const city = g.location?.city || '';
            const state = g.location?.state || '';
            const building = g.location?.building_name || '';
            const addr = [building, city, state].filter(Boolean).join(', ') || 'Bangalore, India';
            const priceVal = g.packages?.[0]?.price ? `₹${parseInt(g.packages[0].price)}/month` : "₹49/month";
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
              image: g.logo || "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400"
            };
          });
          setGyms(mapped);
        } else {
          setGyms(defaultMockGyms);
        }
      } catch (err) {
        console.warn("Failed to fetch featured gyms from Django API, using defaults:", err);
        setGyms(defaultMockGyms);
      } finally {
        setLoading(false);
      }
    };
    fetchGyms();
  }, []);

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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
            <span className="border-b-4 border-red-600">Fitness Centers</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4 font-medium">
            Explore state-of-the-art gyms, yoga studios, and training spaces to elevate your fitness journey.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader className="w-12 h-12 text-red-500 animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Loading premium gyms near you...</p>
          </div>
        ) : gyms.length === 0 ? (
          <div className="text-center py-12">
            <Dumbbell className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No fitness centers available</h3>
          </div>
        ) : (
          <>
            {/* Grid of 6 gyms */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {gyms.map((directory) => (
                <div
                  key={directory.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative">
                      <img
                        src={directory.image}
                        alt={directory.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(directory.category)}`}>
                          {directory.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-lg font-bold text-red-500">{directory.membership}</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-black line-clamp-1">
                          {directory.name}
                        </h3>
                        <div className="flex items-center flex-shrink-0">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700 ml-1">
                            {directory.rating}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        {directory.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-700">
                          <MapPin className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                          <span className="text-sm line-clamp-1">{directory.address}</span>
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
                    </div>
                  </div>
                  
                  <div className="p-6 pt-0 flex gap-2">
                    <button
                      onClick={() => navigate(`/gym/${directory.id}`)}
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
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/fitness-directory')}
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View All Fitness Centers
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FitnessCenterSection;
