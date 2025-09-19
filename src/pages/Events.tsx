import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, Search, Award } from 'lucide-react';
import axios from 'axios';

// 1. Update the interface to include judgingCriteria
interface IEvent {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  participants: number;
  maxParticipants: number;
  fee: number;
  imageUrl: string;
  judgingCriteria?: string[]; // It's optional as older events might not have it
}

const Events = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://discipl-server.onrender.com/api/events');  // Used for github deployment
        //const response = await axios.get('http://localhost:8172/api/events');
        setEvents(response.data);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Challenge': 'bg-red-100 text-red-800', 'Workshop': 'bg-blue-100 text-blue-800',
      'Competition': 'bg-purple-100 text-purple-800', 'Seminar': 'bg-green-100 text-green-800',
      'Training': 'bg-orange-100 text-orange-800', 'Dance': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero and Search Sections */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50 text-black sm: h-[15rem] md: h-[15rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Fitness <span className="text-red-500">Events</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600">
              Discover exciting fitness events, competitions, and workshops in your area
            </p>
          </div>
        </div>
      </section>
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <h2 className="text-2xl font-bold text-black">Upcoming Events</h2>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          {searchTerm && (
            <div className="mt-4 text-gray-600">
              Found {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} matching "{searchTerm}"
            </div>
          )}
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">No events found</h3>
              <p className="text-gray-500">
                {searchTerm ? `No events match "${searchTerm}".` : 'Check back later for new events!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={event.imageUrl || 'https://placehold.co/600x400/f87171/white?text=Event'}
                      alt={event.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-lg font-bold text-red-500">₹{event.fee}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-black mb-3">{event.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{event.description}</p>
                    
                    {/* --- 2. NEW SECTION: Display Judging Criteria --- */}
                    {event.judgingCriteria && event.judgingCriteria.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center text-sm font-bold text-gray-800 mb-2">
                           <Award className="w-4 h-4 mr-2 text-red-500" />
                           <span>Judging Criteria</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {event.judgingCriteria.map((criterion, index) => (
                            <span key={index} className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">
                              {criterion}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* --- END OF NEW SECTION --- */}

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="w-4 h-4 mr-2 text-red-500" />
                        <span className="text-sm">{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="w-4 h-4 mr-2 text-red-500" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <MapPin className="w-4 h-4 mr-2 text-red-500" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Users className="w-4 h-4 mr-2 text-red-500" />
                        <span className="text-sm">{event.participants}/{event.maxParticipants} participants</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {Math.round((event.participants / event.maxParticipants) * 100)}% full
                      </span>
                    </div>
                    <button className="w-full mt-4 bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600">
                      Register Now
                    </button>
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

export default Events;
