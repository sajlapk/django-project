import React from "react";

const About = () => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* About Us */}
      <section className="w-full bg-white py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-12"><span className="border-b-4 border-red-600">About Us</span></h2>
        <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed mb-6 font-semibold">The All-in-One Fitness Ecosystem</p>
        <p className="text-gray-600 text-lg max-w-4xl mx-auto px-6 leading-relaxed font-semibold">
          Connecting People, Fitness Centers, and Brands through Technology, Community, and Lifestyle — to make Fitness Fun, Engaging, and Rewarding.
        </p>
      </section>

      {/* Our Ecosystem */}
      <section className="w-full bg-black py-20 text-white">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-24">
          <span className="border-b-4 border-red-600">Our Ecosystem</span>
        </h2>
        
        <div className="w-full flex flex-col">
          {/* Ecosystem Container 1 */}
          <div className="flex flex-row justify-start items-center relative pl-[10rem]"> 
            {/* Container */}
            <div className="flex flex-col justify-center items-center h-[30rem] w-[60rem] gap-2">
              <div className="flex flex-row items-center justify-between space-x-2 w-full">
                {/* Block[1][1] */}
                <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[45%] md:w-[45%] flex flex-row items-center justify-evenly space-x-2">
                  <div>
                    <img src="about_page_elements/discipl_logo_sing.png" className="h-[7rem] object-contain"/>
                  </div>
                  <div className="flex flex-col justify-start items center">
                    <img src="logo_white_bg.png" className="h-10 object-cover mb-1"/>
                    <span className="text-2xl font-bold">User App</span>
                  </div>
                </div >

                {/* Block[1][2] */}
                <div className="bg-[#DEE8FF] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[55%] md:w-[55%] flex flex-row items-center justify-evenly space-x-2">
                  <div className="max-w-[11rem]"> 
                    <span className="text-2xl font-bold">Pay with EMI & Subscription Options.</span>
                  </div>
                  <div>
                    <img src="about_page_elements/checklist.png" className="h-[10rem] object-contain"/>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2 w-full">
                {/* Block[2][1] */}
                <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                  <div className="max-w-[11rem] pl-[1rem]"> 
                    <span className="text-2xl font-bold">Turn your Workout into Rewards..</span>
                  </div>
                  <div>
                    <img src="about_page_elements/shoe.png" className="h-[8rem] object-contain pr-[3rem]"/>
                  </div>
                </div >              

                {/* Block[2][2] */}
                <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                  <div className="min-w-[2rem]">
                    <img src="about_page_elements/locate.png" className="h-[9rem] object-contain"/>
                  </div>
                  <div className="max-w-[11rem]">
                    <span className="text-2xl font-bold">Discover Fitness centers near you.</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2 w-full">
                {/* Block[3][1] */}
                <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                  <div className="min-w-[2rem]">
                    <img src="about_page_elements/wallet.png" className="h-[9rem] object-contain"/>
                  </div>
                  <div className="max-w-[12rem] mr-[2rem]">
                    <span className="text-[1.53rem] font-bold">Earn Cashbacks & Rewards.</span>
                  </div>
                </div > 

                {/* Block[3][2] */}
                <div className="bg-[#E9E9E9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-col items-start justify-between">
                  <div className="max-w-[12rem]">
                    <span className="text-[1.53rem] font-bold">For Who?</span>
                  </div>
                  <div className="min-w-[2rem]">
                    <span className="text-[1.53rem] font-bold">..</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mascot*/}
            <div>
              <img 
                src="mascot.png" 
                alt="Mascot" 
                className="absolute bottom-[-3rem] right-[15rem] h-[40rem] object-contain mx-auto"
              />
            </div> 
          </div> 

          <div className="border-t border-gray-700 w-[35rem] mx-auto mt-[8rem] mb-[8rem]"></div>

          {/* Ecosystem Container 2 */}
          <div className="flex flex-row justify-end items-center relative pr-[10rem]"> 
            {/* Mascot*/}
            <div>
              <img 
                src="mascot.png" 
                alt="Mascot" 
                className="absolute bottom-[-3rem] left-[15rem] h-[40rem] object-contain mx-auto"
              />
            </div> 

            {/* Container */}
            <div className="flex flex-col justify-center items-center h-[30rem] w-[60rem] gap-2">
              <div className="flex flex-row items-center justify-between space-x-2 w-full">
                {/* Block[1][1] */}
                <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[45%] md:w-[45%] flex flex-row items-center justify-evenly space-x-2">
                  <div>
                    <img src="about_page_elements/mentor_app_logo.png" className="h-[6rem] object-contain"/>
                  </div>
                  <div className="flex flex-col justify-start items center">
                    <img src="logo_white_bg.png" className="h-10 object-cover mb-1"/>
                    <span className="text-2xl font-bold">Mentor App</span>
                  </div>
                </div >

                {/* Block[1][2] */}
                <div className="bg-[#DEE8FF] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[55%] md:w-[55%] flex flex-row items-center justify-evenly">
                  <div className="max-w-[12rem]"> 
                    <span className="text-[1.29rem] font-bold">Automate Payments <br/>& Daily Operations.</span>
                  </div>
                  <div>
                    <img src="about_page_elements/card.png" className="h-[10rem] object-contain"/>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2 w-full">
                {/* Block[2][1] */}
                <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                  <div className="max-w-[15rem] ml-[1.5rem]"> 
                    <span className="text-[1.29rem] font-bold">Digitalize, Automate & grow your <br/>Fitness Business.</span>
                  </div>
                  <div>
                    <img src="about_page_elements/market_growth.png" className="h-[7rem] object-contain"/>
                  </div>
                </div >              

                {/* Block[2][2] */}
                <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                  <div className="min-w-[2rem]">
                    <img src="about_page_elements/client.png" className="h-[9rem] object-contain"/>
                  </div>
                  <div className="max-w-[11rem] mr-[2rem]">
                    <span className="text-[1.4rem] font-bold">Manage Clients, Memberships <br/>& Renewals.</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2 w-full">
                {/* Block[3][1] */}
                <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                  <div className="min-w-[2rem]">
                    <img src="about_page_elements/lens.png" className="h-[9rem] object-contain"/>
                  </div>
                  <div className="max-w-[12rem] mr-[2rem]">
                    <span className="text-[1.5rem] font-bold">Boost visibility through User App.</span>
                  </div>
                </div > 

                {/* Block[3][2] */}
                <div className="bg-[#E9E9E9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%]">
                  <div className="max-w-[12rem]">
                    <span className="text-[1.53rem] font-bold">For Who?</span>
                  </div>
                  <div className="min-w-[2rem]">
                    <span className="text-[1.53rem] font-bold">..</span>
                  </div>
                </div>
              </div>
            </div>
          </div> 

          <div className="border-t border-gray-700 w-[35rem] mx-auto mt-[8rem] mb-[8rem]"></div>
          
          {/* Ecosystem Container 3 */}
          <div className="flex flex-row justify-start items-center relative pl-[10rem]"> 
            {/* Mascot*/}
            <div>
              <img 
                src="mascot.png" 
                alt="Mascot" 
                className="absolute bottom-[-3rem] right-[15rem] h-[40rem] object-contain mx-auto"
              />
            </div> 

            {/* Container */}
            <div className="flex flex-col justify-center items-center h-[30rem] w-[60rem] gap-2">
              <div className="flex flex-row items-center justify-between space-x-2 w-full">
                {/* Block[1][1] */}
                <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[45%] md:w-[45%] flex flex-row items-center justify-evenly space-x-2">
                  <div className="bg-[#F1F1F1] p-6 rounded-[2.25rem] shadow-md border-2 border-red-400 bg-gradient-to-t from-[#E0E0E0] to-[#FDFDFD]">
                    <img src="logo_sing.png" className="h-[5rem] object-contain"/>
                  </div>
                  <div className="flex flex-col justify-start items center">
                    <img src="logo_white_bg.png" className="h-10 object-cover mb-1"/>
                    <span className="text-2xl font-bold">User App</span>
                  </div>
                </div >

                {/* Block[1][2] */}
                <div className="bg-[#DEE8FF] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[55%] md:w-[55%]">

                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2 w-full">
                {/* Block[2][1] */}
                <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">

                </div >              

                {/* Block[2][2] */}
                <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%]">

                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2 w-full">
                {/* Block[3][1] */}
                <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">

                </div > 

                {/* Block[3][2] */}
                <div className="bg-[#E9E9E9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%]">

                </div>
              </div>
            </div>
          </div> 
        </div>
      </section>         

      {/* Our Services */}
      <section className="w-full bg-red-600 py-20 text-white">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          <span className="border-b-4 border-black">Our Services</span>
        </h2>

        <div className="w-full flex flex-col">
          {/* Services Container 1 */}
          <div className="flex flex-row justify-end items-center relative pr-[10rem]"> 
            {/* Container */}
            <div className="flex flex-col justify-center items-center h-[30rem] w-[60rem] gap-2">
              <div className="flex flex-row items-center justify-between space-x-2 w-full">
                {/* Block[1][1] */}
                <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[45%] md:w-[45%] flex flex-row items-center justify-evenly space-x-2">
                  <div className="bg-[#F1F1F1] p-6 rounded-[2.25rem] shadow-md border-2 border-red-400 bg-gradient-to-t from-[#E0E0E0] to-[#FDFDFD]">
                    <img src="logo_sing.png" className="h-[5rem] object-contain"/>
                  </div>
                  <div className="flex flex-col justify-start items center">
                    <img src="logo_white_bg.png" className="h-10 object-cover mb-1"/>
                    <span className="text-2xl font-bold">User App</span>
                  </div>
                </div >

                {/* Block[1][2] */}
                <div className="bg-[#DEE8FF] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[55%] md:w-[55%]">

                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2 w-full">
                {/* Block[2][1] */}
                <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">

                </div >              

                {/* Block[2][2] */}
                <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%]">

                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2 w-full">
                {/* Block[3][1] */}
                <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">

                </div > 

                {/* Block[3][2] */}
                <div className="bg-[#E9E9E9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%]">

                </div>
              </div>
            </div>

            {/* Mascot*/}
            <div>
              <img 
                src="mascot.png" 
                alt="Mascot" 
                className="absolute bottom-[-3rem] left-[15rem] h-[40rem] object-contain mx-auto"
              />
            </div> 
          </div> 

          <div className="border-t border-white w-[35rem] mx-auto mt-[8rem] mb-[8rem]"></div>

          {/* Services Container 2 */}
          <div className="flex flex-row justify-start items-center relative pl-[10rem]"> 
            {/* Mascot*/}
            <div>
              <img 
                src="mascot.png" 
                alt="Mascot" 
                className="absolute bottom-[-3rem] right-[15rem] h-[40rem] object-contain mx-auto"
              />
            </div> 

            {/* Container */}
            <div className="flex flex-col justify-center items-center h-[30rem] w-[60rem] gap-2">
              <div className="flex flex-row items-center justify-between space-x-2 w-full">
                {/* Block[1][1] */}
                <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[45%] md:w-[45%] flex flex-row items-center justify-evenly space-x-2">
                  <div className="bg-[#F1F1F1] p-6 rounded-[2.25rem] shadow-md border-2 border-red-400 bg-gradient-to-t from-[#E0E0E0] to-[#FDFDFD]">
                    <img src="logo_sing.png" className="h-[5rem] object-contain"/>
                  </div>
                  <div className="flex flex-col justify-start items center">
                    <img src="logo_white_bg.png" className="h-10 object-cover mb-1"/>
                    <span className="text-2xl font-bold">User App</span>
                  </div>
                </div >

                {/* Block[1][2] */}
                <div className="bg-[#DEE8FF] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[55%] md:w-[55%]">

                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2 w-full">
                {/* Block[2][1] */}
                <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">

                </div >              

                {/* Block[2][2] */}
                <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%]">

                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2 w-full">
                {/* Block[3][1] */}
                <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">

                </div > 

                {/* Block[3][2] */}
                <div className="bg-[#E9E9E9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%]">

                </div>
              </div>
            </div>
          </div> 

          <div className="border-t border-white w-[35rem] mx-auto mt-[8rem] mb-[8rem]"></div>

          {/* Services Container 3 */}
          <div className="flex flex-row justify-end items-center relative pr-[10rem]"> 
            {/* Mascot*/}
            <div>
              <img 
                src="mascot.png" 
                alt="Mascot" 
                className="absolute bottom-[-3rem] left-[15rem] h-[40rem] object-contain mx-auto"
              />
            </div> 

            {/* Container */}
            <div className="flex flex-col justify-center items-center h-[30rem] w-[60rem] gap-2">
              <div className="flex flex-row items-center justify-between space-x-2 w-full">
                {/* Block[1][1] */}
                <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[45%] md:w-[45%] flex flex-row items-center justify-evenly space-x-2">
                  <div className="bg-[#F1F1F1] p-6 rounded-[2.25rem] shadow-md border-2 border-red-400 bg-gradient-to-t from-[#E0E0E0] to-[#FDFDFD]">
                    <img src="logo_sing.png" className="h-[5rem] object-contain"/>
                  </div>
                  <div className="flex flex-col justify-start items center">
                    <img src="logo_white_bg.png" className="h-10 object-cover mb-1"/>
                    <span className="text-2xl font-bold">User App</span>
                  </div>
                </div >

                {/* Block[1][2] */}
                <div className="bg-[#DEE8FF] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[55%] md:w-[55%]">

                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2 w-full">
                {/* Block[2][1] */}
                <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">

                </div >              

                {/* Block[2][2] */}
                <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%]">

                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2 w-full">
                {/* Block[3][1] */}
                <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">

                </div > 

                {/* Block[3][2] */}
                <div className="bg-[#E9E9E9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%]">

                </div>
              </div>
            </div>
          </div> 
        </div>
      </section>

      {/* Our Purpose */}
      <section className="w-full bg-white py-20 text-center border-gray-200 border-b">
        <h2 className="text-3xl md:text-5xl font-bold mb-20"><span className="border-b-4 border-red-600">Our Purpose</span></h2>
        <p className="text-gray-700 text-[1.25rem] max-w-4xl mx-auto leading-relaxed font-semibold">
          At Discipl, we believe fitness should be accessible, exciting, and rewarding. By helping fitness centers grow, motivating individuals, and empowering brands to promote health — we’re not just building an app; we’re building a movement for a healthier world.
        </p>
      </section>
    </div>
  );
};

export default About;
