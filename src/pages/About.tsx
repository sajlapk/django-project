import React from "react";

const About = () => {
  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">

      {/* About Us */}
      <section className="w-full bg-white py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-12">
          <span className="border-b-4 border-red-600">About Us</span>
        </h2>
        <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed mb-6 font-semibold">
          The All-in-One Fitness Ecosystem
        </p>
        <p className="text-gray-600 text-lg max-w-4xl mx-auto px-6 leading-relaxed font-semibold">
          Connecting People, Fitness Centers, and Brands through Technology, Community,
          and Lifestyle — to make Fitness Fun, Engaging, and Rewarding.
        </p>
      </section>


      {/* ================= DESKTOP VIEW ================= */}
      <section className="hidden lg:block w-full">

        {/* Ecosystem Section */}
        <div className="w-full bg-black py-20 text-white">
          <h2 className="text-4xl font-bold text-center mb-24">
            <span className="border-b-4 border-red-600">Our Ecosystem</span>
          </h2>

          <div className="flex flex-col gap-40 items-center w-full">

            {/* ====== Ecosystem Desktop Section 1 ====== */}
            <div className="w-full max-w-7xl flex items-center justify-between gap-10 px-10">

              {/* Left Content */}
              <div className="flex flex-col w-full gap-4">
                {/* Row 1 */}
                <div className="flex gap-4">
                  <div className="bg-[#FFDAD9] lg:w-[40%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <img src="about_page_elements/discipl_logo_sing.png" className="h-24 object-contain" />
                    <div>
                      <img src="logo_white_bg.png" className="h-10 object-contain"/>
                      <p className="text-black font-bold text-2xl">User App</p>
                    </div>
                  </div>
                  <div className="bg-[#DEE8FF] lg:w-[60%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <p className="text-black font-bold text-xl max-w-xs">
                      Pay with EMI & Subscription Options.
                    </p>
                    <img src="about_page_elements/checklist.png" className="h-28 object-contain" />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex gap-4">
                  <div className="bg-[#FFDAD9] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <span className="text-black font-bold text-xl max-w-xs">
                      Turn your Workout into Rewards.
                    </span>
                    <img src="about_page_elements/shoe.png" className="h-24 object-contain" />
                  </div>
                  <div className="bg-[#FFF0BB] lg:w-[50%] rounded-2xl shadow-md overflow-hidden grid grid-cols-[auto_1fr] items-center">
                    <div className="flex-shrink-0">
                      <img src="about_page_elements/locate.png" className="h-28 w-20 sm:h-32 sm:w-32 md:h-36 md:w-36 object-cover block"/>
                    </div>
                    <div className="p-6">
                      <p className="text-black font-bold text-xl max-w-xs">Discover Fitness centers near you.</p>
                    </div>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex gap-4">
                  <div className="bg-[#FFF0BB] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <img src="about_page_elements/wallet.png" className="h-24 object-contain" />
                    <p className="text-black font-bold text-xl">
                      Earn Cashbacks & Rewards.
                    </p>
                  </div>
                  <div className="bg-[#E9E9E9] lg:w-[50%] p-6 rounded-2xl shadow-md flex flex-col justify-center gap-4">
                    <p className="text-black font-bold text-xl">For Who?</p>
                    <p className="text-black font-bold text-xl">...</p>
                  </div>
                </div>
              </div>

              {/* Mascot */}
              <img
                src="about_page_elements/mascot_mobile_ecosystem_row_1.png"
                className="h-[30rem] object-contain"
              />
            </div>

            {/* Divider */}
            <div className="w-1/2 border-t border-gray-700"></div>


            {/* ====== Ecosystem Desktop Section 2 ====== */}
            <div className="w-full max-w-7xl flex items-center justify-between gap-10 px-10">

              {/* Mascot */}
              <img
                src="about_page_elements/mascot_mobile_ecosystem_row_2.png"
                className="h-[30rem] object-contain"
              />

              {/* Right Content */}
              <div className="flex flex-col w-full gap-4">
                <div className="flex gap-4">
                  <div className="bg-[#FFDAD9] lg:w-[40%] p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <img src="about_page_elements/mentor_app_logo.png" className="h-20 object-contain" />
                    <div>
                      <img src="logo_white_bg.png" className="h-10 object-contain"/>
                      <p className="text-black font-bold text-2xl">Mentor App</p>
                    </div>
                  </div>

                  <div className="bg-[#DEE8FF] lg:w-[60%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <p className="text-black font-bold text-xl max-w-xs">
                      Automate Payments & Daily Operations.
                    </p>
                    <img src="about_page_elements/card.png" className="h-28 object-contain" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#FFDAD9] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <p className="text-black font-bold text-xl max-w-md">
                      Digitalize, Automate & grow your Fitness Business.
                    </p>
                    <img src="about_page_elements/market_growth.png" className="h-24 object-contain" />
                  </div>

                  <div className="bg-[#FFF0BB] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <img src="about_page_elements/client.png" className="h-24 object-contain" />
                    <p className="text-black font-bold text-xl max-w-xs">
                      Manage Clients, Memberships & Renewals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#FFF0BB] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <img src="about_page_elements/lens.png" className="h-24 object-contain" />
                    <p className="text-black font-bold text-xl max-w-sm">
                      Boost visibility through User App.
                    </p>
                  </div>

                  <div className="bg-[#E9E9E9] lg:w-[50%] p-6 rounded-2xl shadow-md flex flex-col justify-center gap-4">
                    <p className="text-black font-bold text-xl">For Who?</p>
                    <p className="text-black font-bold text-xl">...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-1/2 border-t border-gray-700"></div>

            {/* ====== Ecosystem Desktop Section 3 ====== */}
            <div className="w-full max-w-7xl flex items-center justify-between gap-10 px-10">

              {/* Left Content */}
              <div className="flex flex-col w-full gap-4">
                <div className="flex gap-4">
                  <div className="bg-[#FFDAD9] lg:w-[40%] p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <img src="about_page_elements/carry_bag.png" className="h-20 object-contain" />
                    <div>
                      <img src="logo_white_bg.png" className="h-10 object-contain"/>
                      <p className="text-black font-bold text-2xl">Sponsor App</p>
                    </div>
                  </div>

                  <div className="bg-[#DEE8FF] lg:w-[60%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <p className="text-black font-bold text-xl max-w-xs">
                      Sponsor Fitness Challenges & Prizes.
                    </p>
                    <img src="about_page_elements/cup.png" className="h-28 object-contain" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#FFDAD9] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <p className="text-black font-bold text-xl max-w-md">
                      Promote Health, Reach real Audiences.
                    </p>
                    <img src="about_page_elements/promote_health.png" className="h-24 object-contain" />
                  </div>

                  <div className="bg-[#FFF0BB] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <img src="about_page_elements/advertise.png" className="h-24 object-contain" />
                    <p className="text-black font-bold text-xl max-w-xs">
                      Advertise across gyms & User Apps.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#FFF0BB] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <img src="about_page_elements/connect.png" className="h-24 object-contain" />
                    <p className="text-black font-bold text-xl max-w-sm">
                      Connect directly with Active Users.
                    </p>
                  </div>

                  <div className="bg-[#E9E9E9] lg:w-[50%] p-6 rounded-2xl shadow-md flex flex-col justify-center gap-4">
                    <p className="text-black font-bold text-xl">For Who?</p>
                    <p className="text-black font-bold text-xl">...</p>
                  </div>
                </div>
              </div>

              {/* Mascot */}
              <img
                src="about_page_elements/mascot_mobile_ecosystem_row_3.png"
                className="h-[30rem] object-contain"
              />

            </div> 
          </div>
        </div>

        {/* Service Section */}
        <div className="w-full bg-red-600 py-20 text-white">
          <h2 className="text-4xl font-bold text-center mb-24">
            <span className="border-b-4 border-black">Our Services</span>
          </h2>

          <div className="flex flex-col gap-40 items-center w-full">

            {/* ====== Service Desktop Section 1 ====== */}
            <div className="w-full max-w-7xl flex items-center justify-between gap-10 px-10">

              {/* Mascot */}
              <img
                src="about_page_elements/mascot_mobile_service_row_1.png"
                className="h-[30rem] object-contain"
              />

              {/* Left Content */}
              <div className="flex flex-col w-full gap-4">
                {/* Row 1 */}
                <div className="flex gap-4">
                  <div className="bg-[#FFDAD9] lg:w-[40%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <img src="about_page_elements/discipl_logo_sing.png" className="h-24 object-contain" />
                    <div>
                      <img src="logo_white_bg.png" className="h-10 object-contain"/>
                      <p className="text-black font-bold text-2xl">TV Ads</p>
                    </div>
                  </div>
                  <div className="bg-[#DEE8FF] lg:w-[60%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <p className="text-black font-bold text-xl max-w-xs">
                      Promote Brands & Fitness Products.
                    </p>
                    <img src="about_page_elements/promote_brands.png" className="h-28 object-contain" />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex gap-4">
                  <div className="bg-[#FFDAD9] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <p className="text-black font-bold text-xl max-w-xs">
                      In-gym TVs that benefit everyone.
                    </p>
                    <img src="about_page_elements/gym_tv.png" className="h-24 object-contain" />
                  </div>
                  <div className="bg-[#FFF0BB] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <img src="about_page_elements/income_source.png" className="h-24 object-contain" />
                    <p className="text-black font-bold text-xl max-w-xs">
                      New Income Source for Fitness Centers.
                    </p>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex gap-4">
                  <div className="bg-[#FFF0BB] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <img src="about_page_elements/wallet.png" className="h-24 object-contain" />
                    <p className="text-black font-bold text-xl">
                      Keep users updated on Offers & Trends.
                    </p>
                  </div>
                  <div className="bg-[#E9E9E9] lg:w-[50%] p-6 rounded-2xl shadow-md flex flex-col justify-center gap-4">
                    <p className="text-black font-bold text-xl">For Who?</p>
                    <p className="text-black font-bold text-xl">...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-1/2 border-t border-gray-700"></div>


            {/* ====== Service Desktop Section 2 ====== */}
            <div className="w-full max-w-7xl flex items-center justify-between gap-10 px-10">

              {/* Left Content */}
              <div className="flex flex-col w-full gap-4">
                <div className="flex gap-4">
                  <div className="bg-[#FFDAD9] lg:w-[40%] p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <img src="about_page_elements/digital_marketing.png" className="h-28 object-contain" />
                    <div>
                      <img src="logo_white_bg.png" className="h-10 object-contain"/>
                      <p className="text-black font-bold text-2xl">Digital Marketing</p>
                    </div>
                  </div>

                  <div className="bg-[#DEE8FF] lg:w-[60%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <p className="text-black font-bold text-xl max-w-xs">
                      Generate local leads effectively.
                    </p>
                    <img src="about_page_elements/generate_growth.png" className="h-28 object-contain" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#FFDAD9] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <p className="text-black font-bold text-xl max-w-md">
                      Helping gyms grow & get noticed.
                    </p>
                    <img src="about_page_elements/help.png" className="h-24 object-contain" />
                  </div>

                  <div className="bg-[#FFF0BB] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <img src="about_page_elements/manage_social_media.png" className="h-24 object-contain" />
                    <p className="text-black font-bold text-xl max-w-xs">
                      Run Ads & manage Social Media.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#FFF0BB] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <img src="about_page_elements/build_visibility.png" className="h-24 object-contain" />
                    <p className="text-black font-bold text-xl max-w-sm">
                      Build visibility & Membership.
                    </p>
                  </div>

                  <div className="bg-[#E9E9E9] lg:w-[50%] p-6 rounded-2xl shadow-md flex flex-col justify-center gap-4">
                    <p className="text-black font-bold text-xl">For Who?</p>
                    <p className="text-black font-bold text-xl">...</p>
                  </div>
                </div>
              </div>

              {/* Mascot */}
              <img
                src="about_page_elements/mascot_mobile_service_row_2.png"
                className="h-[30rem] object-contain"
              />
            </div>

            {/* Divider */}
            <div className="w-1/2 border-t border-gray-700"></div>

            {/* ====== Service Desktop Section 3 ====== */}
            <div className="w-full max-w-7xl flex items-center justify-between gap-10 px-10">

              {/* Mascot */}
              <img
                src="about_page_elements/mascot_mobile_service_row_3.png"
                className="h-[30rem] object-contain"
              />

              {/* Right Content */}
              <div className="flex flex-col w-full gap-4">
                <div className="flex gap-4">
                  <div className="bg-[#FFDAD9] lg:w-[40%] p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <img src="about_page_elements/discipl_collab.png" className="h-24 object-contain" />
                    <div>
                      <img src="logo_white_bg.png" className="h-10 object-contain"/>
                      <p className="text-black font-bold text-1xl">Fitness Events & Collaboration</p>
                    </div>
                  </div>

                  <div className="bg-[#DEE8FF] lg:w-[60%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <p className="text-black font-bold text-xl max-w-xs">
                      Partner with Brands & Sponsors.
                    </p>
                    <img src="about_page_elements/partner.png" className="h-28 object-contain" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#FFDAD9] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <p className="text-black font-bold text-xl max-w-md">
                      Creating real-world Fitness Experiences.
                    </p>
                    <img src="about_page_elements/create_experience.png" className="h-24 object-contain" />
                  </div>

                  <div className="bg-[#FFF0BB] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <img src="about_page_elements/organize.png" className="h-24 object-contain" />
                    <p className="text-black font-bold text-xl max-w-xs">
                      Organize & power Fitness Festivals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#FFF0BB] lg:w-[50%] p-6 rounded-2xl shadow-md flex items-center gap-4">
                    <img src="about_page_elements/build_community.png" className="h-24 object-contain" />
                    <p className="text-black font-bold text-xl max-w-sm">
                      Build a Stronger & Healthier community.
                    </p>
                  </div>

                  <div className="bg-[#E9E9E9] lg:w-[50%] p-6 rounded-2xl shadow-md flex flex-col justify-center gap-4">
                    <p className="text-black font-bold text-xl">For Who?</p>
                    <p className="text-black font-bold text-xl">...</p>
                  </div>
                </div>
              </div>

            </div> 
          </div>
        </div>
      </section>



      {/* ================= MOBILE VIEW ================= */}
      <section className="block lg:hidden w-full">
        <div className="w-full bg-black py-20 text-white">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-24">
            <span className="border-b-4 border-red-600">Our Ecosystem</span>
          </h2>
          
          <div className="w-full flex flex-col">
            {/* Ecosystem Container 1 */}
            <div className="flex flex-col justify-center items-center"> 
              {/* Container */}
              <div className="flex flex-col justify-center items-center h-[15rem] w-[20rem] gap-2">
                <div className="flex flex-row items-center justify-between space-x-2 w-full">
                  {/* Block[1][1] */}
                  <div className="bg-[#FFDAD9] h-[5rem] text-black rounded-2xl shadow-md hover:shadow-lg transition w-[50%] flex flex-row items-center justify-evenly space-x-1">
                    <div>
                      <img src="about_page_elements/discipl_logo_sing.png" className="h-[3rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <img src="logo_white_bg.png" className="h-4 object-cover"/>
                      <p className="text-[0.6rem] font-bold">User App</p>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[50%] flex flex-row items-center justify-evenly space-x-2">
                    <div>  
                      <p className="text-[0.6rem] font-bold">Pay with EMI & Subscription Options.</p>
                    </div>
                    <div>
                      <img src="about_page_elements/checklist.png" className="w-[10rem] object-contain"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[2][1] */}
                  <div className="bg-[#FFDAD9] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[47%] flex flex-row items-center justify-between">
                    <div> 
                      <p className="text-[0.58rem] font-bold">Turn your Workout into Rewards..</p>
                    </div>
                    <div>
                      <img src="about_page_elements/shoe.png" className="h-[8rem] object-contain"/>
                    </div>
                  </div >              

                  {/* Block[2][2] */}
                  <div className="bg-[#FFF0BB] h-[5rem] pr-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[53%] flex flex-row items-center justify-between">
                    <div className="h-full w-full">
                      <img src="about_page_elements/locate.png" className="h-[5rem] w-[20rem]object-cover"/>
                    </div>
                    <div>
                      <p className="text-[0.58rem] font-bold">Discover Fitness centers near you.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[3][1] */}
                  <div className="bg-[#FFF0BB] h-[5rem] text-black rounded-2xl shadow-md hover:shadow-lg transition w-[55%] flex flex-row items-center justify-between">
                    <div>
                      <img src="about_page_elements/wallet.png" className="h-[5rem] object-contain"/>
                    </div>
                    <div>
                      <p className="text-[0.7rem] font-bold">Earn Cashbacks & Rewards.</p>
                    </div>
                  </div > 

                  {/* Block[3][2] */}
                  <div className="bg-[#E9E9E9] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[45%] flex flex-col items-start justify-between">
                    <div>
                      <p className="text-[0.8rem] font-bold">For Who?</p>
                    </div>
                    <div>
                      <p className="text-[0.8rem] font-bold">..</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> 

            <div className="border-t border-gray-700 w-[35rem] mx-auto mt-[8rem] mb-[8rem]"></div>

            {/* Ecosystem Container 2 */}
            <div className="flex flex-col justify-center items-center"> 
              {/* Container */}
              <div className="flex flex-col justify-center items-center h-[15rem] w-[20rem] gap-2">
                <div className="flex flex-row items-center justify-between space-x-2 w-full">
                  {/* Block[1][1] */}
                  <div className="bg-[#FFDAD9] h-[5rem] p-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[50%] flex flex-row items-center justify-evenly space-x-1 gap-1">
                    <div>
                      <img src="about_page_elements/mentor_app_logo.png" className="h-[3rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <img src="logo_white_bg.png" className="h-5"/>
                      <p className="text-[0.62rem] font-bold">Mentor App</p>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[5rem] p-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[50%] flex flex-row items-center justify-evenly space-x-2">
                    <div className="w-[2rem]"> 
                      <p className="text-[0.55rem] font-bold">Automate Payments <br/>& Daily Operations.</p>
                    </div>
                    <div>
                      <img src="about_page_elements/card.png" className="h-[5rem] object-contain"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[2][1] */}
                  <div className="bg-[#FFDAD9] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[55%] flex flex-row items-center justify-between">
                    <div> 
                      <p className="text-[0.55rem] font-bold">Digitalize, Automate & grow your <br/>Fitness Business.</p>
                    </div>
                    <div>
                      <img src="about_page_elements/market_growth.png" className="h-[7rem] object-contain"/>
                    </div>
                  </div >              

                  {/* Block[2][2] */}
                  <div className="bg-[#FFF0BB] h-[5rem] p-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[45%] flex flex-row items-center justify-between space-x-2">
                    <div>
                      <img src="about_page_elements/client.png" className="w-[7rem] object-cover"/>
                    </div>
                    <div>
                      <p className="text-[0.47rem] font-bold">Manage Clients, Memberships <br/>& Renewals.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[3][1] */}
                  <div className="bg-[#FFF0BB] h-[5rem] p-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[50%] flex flex-row items-center justify-between">
                    <div>
                      <img src="about_page_elements/lens.png" className="h-[5rem] object-contain"/>
                    </div>
                    <div>
                      <p className="text-[0.6rem] font-bold">Boost visibility through<br/> User App.</p>
                    </div>
                  </div > 

                  {/* Block[3][2] */}
                  <div className="bg-[#E9E9E9] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[50%] flex flex-col items-start justify-between">
                    <div>
                      <p className="text-[0.8rem] font-bold">For Who?</p>
                    </div>
                    <div>
                      <p className="text-[0.8rem] font-bold">..</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> 

            <div className="border-t border-gray-700 w-[35rem] mx-auto mt-[8rem] mb-[8rem]"></div>
            
            {/* Ecosystem Container 3 */}
            <div className="flex flex-col justify-center items-center"> 
              {/* Container */}
              <div className="flex flex-col justify-center items-center h-[15rem] w-[20rem] gap-2">
                <div className="flex flex-row items-center justify-between space-x-2 w-full">
                  {/* Block[1][1] */}
                  <div className="bg-[#FFDAD9] h-[5rem] p-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[50%] flex flex-row items-center justify-evenly space-x-2">
                    <div>
                      <img src="about_page_elements/carry_bag.png" className="h-[3rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <img src="logo_white_bg.png" className="h-5"/>
                      <p className="text-[0.62rem] font-bold">Sponsor App</p>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[5rem] p-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[50%] flex flex-row items-center justify-evenly space-x-2">
                    <div> 
                      <p className="text-[0.5rem] font-bold ml-[1rem]">Sponsor<br/> Fitness Challenges & Prizes.</p>
                    </div>
                    <div>
                      <img src="about_page_elements/cup.png" className="h-[5rem] object-contain"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[2][1] */}
                  <div className="bg-[#FFDAD9] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[55%] flex flex-row items-center justify-between">
                    <div> 
                      <p className="text-[0.6rem] font-bold">Promote Health, <br/>Reach real Audiences.</p>
                    </div>
                    <div>
                      <img src="about_page_elements/promote_health.png" className="h-[5rem] object-contain"/>
                    </div>
                  </div >              

                  {/* Block[2][2] */}
                  <div className="bg-[#FFF0BB] h-[5rem] text-black rounded-2xl shadow-md hover:shadow-lg transition w-[45%] flex flex-row items-center justify-between">
                    <div>
                      <img src="about_page_elements/advertise.png" className="w-[7rem] object-contain"/>
                    </div>
                    <div>
                      <p className="text-[0.55rem] font-bold">Advertise<br/>across gyms & User Apps.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[3][1] */}
                  <div className="bg-[#FFF0BB] h-[5rem] text-black rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                    <div>
                      <img src="about_page_elements/connect.png" className="h-[4rem] object-contain"/>
                    </div>
                    <div>
                      <p className="text-[0.6rem] font-bold">Connect<br/>directly with Active Users.</p>
                    </div>
                  </div > 

                  {/* Block[3][2] */}
                  <div className="bg-[#E9E9E9] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[45%] flex flex-col items-start justify-between">
                    <div>
                      <p className="text-[0.8rem] font-bold">For Who?</p>
                    </div>
                    <div>
                      <p className="text-[0.8rem] font-bold">..</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>         

        {/* Our Services */}
        <div className="w-full bg-red-600 py-20 text-white">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
            <span className="border-b-4 border-black">Our Services</span>
          </h2>

          <div className="w-full flex flex-col">
            {/* Services Container 1 */}
            <div className="flex flex-col justify-center items-center"> 
              {/* Container */}
              <div className="flex flex-col justify-center items-center h-[15rem] w-[20rem] gap-2">
                <div className="flex flex-row items-center justify-between space-x-2 w-full">
                  {/* Block[1][1] */}
                  <div className="bg-[#FFDAD9] h-[5rem] p-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[45%] flex flex-row items-center justify-evenly gap-1">
                    <div>
                      <img src="about_page_elements/tv_ads.png" className="h-[3rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <img src="logo_white_bg.png" className="h-3 object-cover"/>
                      <p className="text-[0.7rem] font-bold">TV Ads</p>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[55%] flex flex-row items-center justify-evenly">
                    <div>  
                      <p className="text-[0.7rem] font-bold">Promote<br/>Brands & Fitness Products.</p>
                    </div>
                    <div>
                      <img src="about_page_elements/promote_brands.png" className="w-[5rem] object-contain"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[2][1] */}
                  <div className="bg-[#FFDAD9] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[55%] flex flex-row items-center justify-between">
                    <div> 
                      <p className="text-[0.7rem] font-bold">In-gym TVs<br/>that benefit everyone.</p>
                    </div>
                    <div>
                      <img src="about_page_elements/gym_tv.png" className="h-[5rem] object-contain"/>
                    </div>
                  </div >              

                  {/* Block[2][2] */}
                  <div className="bg-[#FFF0BB] h-[5rem] pr-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[45%] flex flex-row items-center justify-between gap-2">
                    <div>
                      <img src="about_page_elements/income_source.png" className="h-[5rem] object-contain"/>
                    </div>
                    <div>
                      <p className="text-[0.57em] font-bold">New Income<br/>Source for Fitness Centers.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[3][1] */}
                  <div className="bg-[#FFF0BB] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[55%] flex flex-row items-center justify-between gap-2">
                    <div>
                      <img src="about_page_elements/keep_users_updated.png" className="h-[5rem] object-contain"/>
                    </div>
                    <div>
                      <p className="text-[0.6rem] font-bold">Keep users<br/>updated on Offers & Trends.</p>
                    </div>
                  </div > 

                  {/* Block[3][2] */}
                  <div className="bg-[#E9E9E9] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[45%] flex flex-col items-start justify-between">
                    <div>
                      <p className="text-[0.8rem] font-bold">For Who?</p>
                    </div>
                    <div>
                      <p className="text-[0.8rem] font-bold">..</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> 

            <div className="border-t border-white w-[35rem] mx-auto mt-[8rem] mb-[8rem]"></div>

            {/* Services Container 2 */}
            <div className="flex flex-col justify-center items-center"> 
              {/* Container */}
              <div className="flex flex-col justify-center items-center h-[15rem] w-[20rem] gap-2">
                <div className="flex flex-row items-center justify-between space-x-2 w-full">
                  {/* Block[1][1] */}
                  <div className="bg-[#FFDAD9] h-[5rem] p-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[50%] flex flex-row items-center justify-evenly gap-2">
                    <div>
                      <img src="about_page_elements/digital_marketing.png" className="h-[3rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <img src="logo_white_bg.png" className="h-4 object-contain"/>
                      <p className="text-[0.5rem] font-bold">Digital Marketing</p>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[50%] flex flex-row items-center justify-evenly">
                    <div>  
                      <p className="text-[0.6rem] font-bold">Generate local leads effectively.</p>
                    </div>
                    <div>
                      <img src="about_page_elements/generate_growth.png" className="h-[7rem] object-contain"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[2][1] */}
                  <div className="bg-[#FFDAD9] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[55%] flex flex-row items-center justify-between">
                    <div> 
                      <p className="text-[0.7rem] font-bold">Helping gyms grow & get noticed.</p>
                    </div>
                    <div>
                      <img src="about_page_elements/help.png" className="h-[7rem] object-contain"/>
                    </div>
                  </div >              

                  {/* Block[2][2] */}
                  <div className="bg-[#FFF0BB] h-[5rem] pr-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[45%] flex flex-row items-center justify-between">
                    <div>
                      <img src="about_page_elements/manage_social_media.png" className="h-[7rem] object-contain"/>
                    </div>
                    <div>
                      <p className="text-[0.7rem] font-bold">Run Ads & manage Social Media.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[3][1] */}
                  <div className="bg-[#FFF0BB] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[55%] flex flex-row items-center justify-between gap-4">
                    <div>
                      <img src="about_page_elements/build_visibility.png" className="h-[5rem] object-contain"/>
                    </div>
                    <div>
                      <p className="text-[0.7rem] font-bold">Build visibility & Membership.</p>
                    </div>
                  </div > 

                  {/* Block[3][2] */}
                  <div className="bg-[#E9E9E9] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[45%] flex flex-col items-start justify-between">
                    <div>
                      <p className="text-[0.8rem] font-bold">For Who?</p>
                    </div>
                    <div>
                      <p className="text-[0.8rem] font-bold">..</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> 

            <div className="border-t border-white w-[35rem] mx-auto mt-[8rem] mb-[8rem]"></div>

            {/* Services Container 3 */}
            <div className="flex flex-col justify-center items-center"> 
              {/* Container */}
              <div className="flex flex-col justify-center items-center h-[15rem] w-[20rem] gap-2">
                <div className="flex flex-row items-center justify-between space-x-2 w-full">
                  {/* Block[1][1] */}
                  <div className="bg-[#FFDAD9] h-[5rem] text-black rounded-2xl shadow-md hover:shadow-lg transition w-[45%] flex flex-row items-center justify-evenly space-x-1">
                    <div>
                      <img src="about_page_elements/discipl_collab.png" className="h-[3rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <img src="logo_white_bg.png" className="h-3.5 object-contain"/>
                      <p className="text-[0.5rem] font-bold">Fitness Events <br/>& Collaboration</p>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[55%] flex flex-row items-center justify-evenly">
                    <div>  
                      <p className="text-[0.6rem] font-bold">Partner with<br/>Brands & Sponsors.</p>
                    </div>
                    <div>
                      <img src="about_page_elements/partner.png" className="w-[5rem] object-contain"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[2][1] */}
                  <div className="bg-[#FFDAD9] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[55%] flex flex-row items-center justify-between">
                    <div> 
                      <p className="text-[0.6rem] font-bold">Creating real-<br/>world Fitness Experiences.</p>
                    </div>
                    <div>
                      <img src="about_page_elements/create_experience.png" className="h-[5.5rem] object-contain"/>
                    </div>
                  </div >              

                  {/* Block[2][2] */}
                  <div className="bg-[#FFF0BB] h-[5rem] pr-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[45%] flex flex-row items-center justify-between gap-2">
                    <div>
                      <img src="about_page_elements/organize.png" className="h-[7rem] object-contain"/>
                    </div>
                    <div>
                      <p className="text-[0.58rem] font-bold">Organize & power Fitness Festivals.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[3][1] */}
                  <div className="bg-[#FFF0BB] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[55%] flex flex-row items-center justify-between gap-2">
                    <div>
                      <img src="about_page_elements/build_community.png" className="h-[4rem] object-contain"/>
                    </div>
                    <div>
                      <p className="text-[0.7rem] font-bold">Build a Stronger<br/>& Healthier community.</p>
                    </div>
                  </div > 

                  {/* Block[3][2] */}
                  <div className="bg-[#E9E9E9] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[45%] flex flex-col items-start justify-between">
                    <div>
                      <p className="text-[0.8rem] font-bold">For Who?</p>
                    </div>
                    <div>
                      <p className="text-[0.8rem] font-bold">..</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </section>


      {/* PURPOSE - Always visible */}
      <section className="w-full bg-white py-20 text-center border-gray-200 border-b">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-14">
          <span className="border-b-4 border-red-600">Our Purpose</span>
        </h2>
        <p className="text-gray-700 max-w-3xl sm:max-w-4xl mx-auto text-lg leading-relaxed font-semibold px-6">
          At Discipl, we believe fitness should be accessible, exciting, and rewarding.
          By helping fitness centers grow, motivating individuals, and empowering brands
          to promote health — we’re not just building an app; we’re building a movement
          for a healthier world.
        </p>
      </section>

    </div>
  );
};

export default About;
