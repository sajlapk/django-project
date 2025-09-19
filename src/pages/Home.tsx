import React from 'react';
import { Link } from 'react-router-dom';
import { IndianRupee, SquareUser, Dumbbell, Blocks } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Blocks className="w-12 h-12 text-red-500" />,
      title: "Mentor App",
      description: "Discover and connect with trained fitness professionals"
    },
    {
      icon: <SquareUser className="w-12 h-12 text-red-500" />,
      title: "User App",
      description: "Manage your workouts and track your progress"
    },
    {
      icon: <IndianRupee className="w-12 h-12 text-red-500" />,
      title: "Sponsor App",
      description: "Find sponsorship opportunities and connect with brands"
    },
  ];

  const stats = [
    { number: "2", label: "Fitness Centers" },
    { number: "100k+", label: "Active Members" },
    { number: "1,500", label: "Events Hosted" },
    { number: "15", label: "Cities" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-red-50 text-black overflow-hidden">
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-60"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-red-300 transform rotate-45 opacity-40"></div>
        <div className="absolute bottom-20 right-40 w-32 h-32 bg-gray-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-red-400 transform rotate-12 opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              TRAIN SMARTER
              <span className="block text-red-500">GET STRONGER</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-gray-600 leading-relaxed">
              Simple fitness experience for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/fitness-directory"
                className="bg-red-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
              >
                Find Events near you
                <span className="ml-2">→</span>
              </Link>
              <Link
                to="/events"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                <Dumbbell className="h-5 w-5 mr-5 text-primary-500" />
                Locate gyms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-700 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background geometric shapes */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-red-100 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-gray-200 transform rotate-45 opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Our Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to achieve your fitness goals and connect with the best facilities
            </p>
          </div>
          
          {/* <div className=" grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> */}
          <div className="lg:flex flex-row justify-evenly items-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white p-8 m-2 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="mb-4 ">{feature.icon}</div>
                <h3 className="text-xl font-bold text-black mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        {/* Background badge */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
          <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            Upcoming Events
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 mt-16">
            ELITE <span className="text-red-500">EVENTS</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of fitness enthusiasts who have already transformed their lives with Discipl
          </p>
          <Link
            to="/register"
            className="inline-flex items-center bg-red-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Get Started Now
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;