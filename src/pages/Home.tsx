const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row h-full w-full">
      <section className="relative w-full text-black overflow-hidden">
        {/* Background Image container with aspect ratio */}
        <div className="relative w-full aspect-[869/384] lg:h-screen">
          <div
            className="absolute inset-0 bg-center bg-contain lg:bg-cover bg-no-repeat"
            style={{ backgroundImage: "url('home_page_elements/bg_home.png')" }}
          ></div>

          {/* Gradient Overlay - Desktop */}
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-b from-white/0 via-white/0 to-white/50"></div>

          {/* Gradient Overlay - Mobile */}
          <div className="absolute inset-0 block lg:hidden bg-gradient-to-b from-white/0 via-white/0 to-white/50"></div>

          {/* Content */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-white sm:text-4xl md:text-6xl lg:text-8xl font-bold leading-tight mb-8">
              The Future of<br />Fitness<br />is Here.
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = "events";
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="bg-red-500 text-sm lg:text-2xl text-white px-3 py-2 lg:px-8 lg:py-4 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
              >
                Find Events near you
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
