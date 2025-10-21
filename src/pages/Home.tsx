const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row h-full w-full">
      {/* Left Section */}
      <section className="relative min-h-screen w-full lg:w-[60%] text-black overflow-hidden flex flex-col justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('carbon_fiber_bg_1.jpg')" }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/40 to-gray-900/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[8rem] font-bold mb-6 leading-tight">
            <span className="text-white">TRAIN SMARTER</span>
            <span className="block text-red-500 text-3d">GET STRONGER</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={(e) => {
                e.preventDefault();
                const targetId = "events";
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-red-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              Find Events near you
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Right Section */}
      <section className="relative min-h-screen w-full lg:w-[40%] bg-gradient-to-br from-gray-50 to-red-50 text-black overflow-hidden flex flex-col justify-end items-center mt-8 md:mt-0">
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-60"></div>
        <div className="absolute top-40 right-20 md:right-80 w-16 h-16 bg-red-300 transform rotate-45 opacity-40"></div>
        <div className="absolute bottom-20 right-10 md:right-40 w-32 h-32 bg-gray-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-40 left-10 md:left-20 w-12 h-12 bg-red-400 transform rotate-12 opacity-50"></div>

        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="mascot.png" 
            alt="Mascot" 
            className="absolute top-[15rem] h-[125%] object-cover "
          />
        </div>
      </section>
    </div>
  );
};

export default Home;