import React from 'react';
import { Target, Users, Award, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="w-12 h-12 text-red-500" />,
      title: "Attract Fitness Enthusiasts",
      description: "Promote your business to thousands of active users."
    },
    {
      icon: <Users className="w-12 h-12 text-red-500" />,
      title: "Boost Sales ",
      description: "Offer exclusive deals and discounts to drive customer engagement."
    },
    {
      icon: <Award className="w-12 h-12 text-red-500" />,
      title: "Seamless Payments",
      description: "Enjoy direct payouts and easy management of offers."
    },
    {
      icon: <Award className="w-12 h-12 text-red-500" />,
      title: "Be Part of the Movement",
      description: "Support Fit Kerala 2025 and contribute to a healthier society."
    }
  ];

  const team = [
    {
      name: "Founder 1",
      position: "CEO & Founder",
      image: "placeholder_user.png"
    },
    {
      name: "Founder 2",
      position: "CTO",
      image: "placeholder_user.png"
    },
    {
      name: "Founder 3",
      position: "Head of Operations",
      image: "placeholder_user.png"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50 text-black  sm: h-[20rem] md: h-[20rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-red-500">Discipl</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-600 leading-relaxed">
              We're revolutionizing how fitness centers and enthusiasts connect, creating a comprehensive platform 
              for fitness management, events, and community building.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                At Discipl, we understand that most people struggle to even start their health journey, and those who do often find it hard to stay consistent. That’s why we’ve created a platform that uses technology to find your unique motivation—whether 
                it’s rewards, social recognition, entertainment, or gamification—to help you stay committed and disciplined on your path to wellness.
              </p>
              <p className="text-lg text-gray-200 leading-relaxed">
                With lifestyle diseases on the rise, we believe that health is not just a choice; it’s a responsibility. 
                As India’s biggest asset, our young population must prioritize fitness to avoid becoming a liability. Together, we can turn this challenge into an opportunity and drive towards a healthier, more vibrant nation through Fit Kerala 2025.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="text-6xl font-bold text-red-500 mb-4">Why Choose Discipl?</div>
              <ul className="text-gray-900 list-disc pl-5">
                <li><span className="font-bold">Stay Motivated: </span> <span className="text-gray-600">We help you find the right hook—rewards, social recognition, or entertainment—to keep you on track.</span></li>
                <li><span className="font-bold">Make an Impact: </span><span className="text-gray-600">By staying healthy, you inspire others and contribute to a healthier society.</span></li>
                <li><span className="font-bold">Be Part of a Revolution: </span><span className="text-gray-600">Join thousands of users and sponsors driving the Fit Kerala 2025 movement.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Our Vision: Building a Healthier India
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At Discipl, we’re more than just a platform—we’re a movement committed to building a fitter, healthier India. Through Fit Kerala 2025, we aim to:
            </p>
          </div>
          
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> */}
          <div className="lg:flex flex-row justify-evenly items-center">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex flex-col justify-evenly  text-center items-center bg-white p-10 m-2 w-full h-[20rem] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate professionals dedicated to transforming the fitness industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
                />
                <h3 className="text-xl font-bold text-black mb-2">
                  {member.name}
                </h3>
                <p className="text-red-600 font-medium">
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works Section */}
      <section className="py-20 bg-black" id="work">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
            How it works
          </h2>

          <div className="flex flex-col md:flex-row md:justify-evenly md:space-y-0 space-y-8 p-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center bg-black rounded-xl shadow hover:shadow-lg transition  w-full md:w-[25rem] h-[15rem]">
              <img
                src="https://thediscipl.com/wp-content/uploads/2022/12/icons8-download-24-1-1.png"
                alt="Download Icon"
                className="p-8 mb-4 bg-red-600 rounded-xl"
                width={100}
                height={100}
                loading="lazy"
              />
              <h3 className="text-white text-xl font-bold mb-2">Download</h3>
              <p className="text-white text-center">
                Download Discipl from App store or Play store
              </p>
            </div>

            {/* Connector */}
            <div className="hidden md:flex flex-col items-center justify-center w-20 h-100">
              <div className="w-full h-1 border-t-4 border-dotted border-white mb-4"></div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center bg-black rounded-xl shadow hover:shadow-lg transition w-full md:w-[25rem] h-[15rem]">
              <img
                src="https://thediscipl.com/wp-content/uploads/2022/12/icons8-search-more-50-1.png"
                alt="Search Icon"
                className="p-8 mb-4 bg-red-600 rounded-xl"
                width={100}
                height={100}
                loading="lazy"
              />
              <h3 className="text-white text-xl font-bold mb-2">Search</h3>
              <p className="text-white text-center">
                Search, explore and compare local fitness centers
              </p>
            </div>

            {/* Connector */}
            <div className="hidden md:flex flex-col items-center justify-center w-20 h-100 bg-black">
              <div className="w-full h-1 border-t-4 border-dotted border-white mb-4"></div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center bg-black rounded-xl shadow hover:shadow-lg transition w-full md:w-[25rem] h-[15rem]">
              <img
                src="https://thediscipl.com/wp-content/uploads/2022/12/icons8-hand-cursor-50-1.png"
                alt="Select Icon"
                className="p-8 mb-4 bg-red-600 rounded-xl"
                width={100}
                height={100}
                loading="lazy"
              />
              <h3 className="text-white text-xl font-bold mb-2">Select</h3>
              <p className="text-white text-center">
                Select workout from various fitness options (yoga, gym, zumba and many more)
              </p>
            </div>

            {/* Connector */}
            <div className="hidden md:flex flex-col items-center justify-center w-20 h-100 bg-black">
              <div className="w-full h-1 border-t-4 border-dotted border-white mb-4"></div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center bg-black rounded-xl shadow hover:shadow-lg transition w-full md:w-[25rem] h-[15rem]">
              <img
                src="https://thediscipl.com/wp-content/uploads/2022/12/icons8-double-tick-50-1.png"
                alt="Book Icon"
                className="p-8 mb-4 bg-red-600 rounded-xl"
                width={100}
                height={100}
                loading="lazy"
              />
              <h3 className="text-white text-xl font-bold mb-2">Book</h3>
              <p className="text-white text-center">
                Book your workout at best guaranteed price
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Message Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Health is Responsibility, Not a Choice
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl mb-6 leading-relaxed">
                India’s biggest asset is its <b>young population</b>, but with the rapid rise in lifestyle diseases, this asset risks turning into a liability. 
                As citizens, it’s our <b>responsibility to stay healthy and inspire others</b> to do the same. Let’s create a future where fitness is a way of life for everyone.
              </p>
              <p className="text-xl leading-relaxed">
                Together, with <b>Discipl</b>, let’s lead the fitness revolution and build a healthier tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;