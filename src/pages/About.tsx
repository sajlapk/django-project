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
      
      {/* ----- DESKTOP VIEW ------ */}
      {/* Our Ecosystem */}
      <section className="hidden lg:block w-full">
        <div className="w-full bg-black py-20 text-white">
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
                    <div className="">
                      <img src="about_page_elements/carry_bag.png" className="h-[7rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items center">
                      <img src="logo_white_bg.png" className="h-10 object-cover mb-1"/>
                      <span className="text-2xl font-bold">Sponsor App</span>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[55%] md:w-[55%] flex flex-row items-center justify-evenly space-x-2">
                    <div className="max-w-[12rem]"> 
                      <span className="text-[1.35rem] font-bold">Sponsor<br/> Fitness Challenges & Prizes.</span>
                    </div>
                    <div>
                      <img src="about_page_elements/cup.png" className="h-[10rem] object-contain"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[2][1] */}
                  <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                    <div className="max-w-[15rem] ml-[1.5rem]"> 
                      <span className="text-[1.5rem] font-bold">Promote Health, <br/>Reach real Audiences.</span>
                    </div>
                    <div>
                      <img src="about_page_elements/promote_health.png" className="h-[9rem] object-contain mr-[1.2rem]"/>
                    </div>
                  </div >              

                  {/* Block[2][2] */}
                  <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                    <div className="min-w-[2rem]">
                      <img src="about_page_elements/advertise.png" className="h-[9rem] object-contain"/>
                    </div>
                    <div className="max-w-[11rem] mr-[2rem]">
                      <span className="text-[1.6rem] font-bold">Advertise<br/>across gyms & User Apps.</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[3][1] */}
                  <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                    <div className="min-w-[2rem]">
                      <img src="about_page_elements/connect.png" className="h-[9rem] object-contain"/>
                    </div>
                    <div className="max-w-[12rem] mr-[2rem]">
                      <span className="text-[1.6rem] font-bold">Connect<br/>directly with Active Users.</span>
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
          </div>
        </div>         

        {/* Our Services */}
        <div className="w-full bg-red-600 py-20 text-white">
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
                    <div>
                      <img src="about_page_elements/tv_ads.png" className="h-[7.5rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items center">
                      <img src="logo_white_bg.png" className="h-10 object-cover mb-1"/>
                      <span className="text-2xl font-bold">TV Ads</span>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[55%] md:w-[55%] flex flex-row items-center justify-evenly space-x-2">
                    <div className="max-w-[12rem]"> 
                      <span className="text-[1.5rem] font-bold">Promote<br/>Brands & Fitness Products.</span>
                    </div>
                    <div>
                      <img src="about_page_elements/promote_brands.png" className="h-[10rem] object-contain"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[2][1] */}
                  <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                    <div className="max-w-[15rem] ml-[2rem]"> 
                      <span className="text-[1.6rem] font-bold">In-gym TVs<br/>that benefit everyone.</span>
                    </div>
                    <div>
                      <img src="about_page_elements/gym_tv.png" className="h-[9rem] object-contain mr-[4rem]"/>
                    </div>
                  </div >              

                  {/* Block[2][2] */}
                  <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-evenly space-x-2">
                    <div className="min-w-[2rem]">
                      <img src="about_page_elements/income_source.png" className="h-[9rem] object-contain"/>
                    </div>
                    <div className="max-w-[13rem] mr-[2rem]">
                      <span className="text-[1.6rem] font-bold">New Income<br/>Source for Fitness Centers.</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[3][1] */}
                  <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                    <div className="min-w-[2rem]">
                      <img src="about_page_elements/keep_users_updated.png" className="h-[9rem] object-contain"/>
                    </div>
                    <div className="max-w-[13rem] mr-[2rem]">
                      <span className="text-[1.6rem] font-bold">Keep users updated on Offers & Trends.</span>
                    </div>
                  </div > 

                  {/* Block[3][2] */}
                  <div className="bg-[#E9E9E9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-col justify-start space-x-2">
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
                    <div>
                      <img src="about_page_elements/digital_marketing.png" className="h-[7rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items center">
                      <img src="logo_white_bg.png" className="h-12 object-cover mb-1"/>
                      <p className="text-2xl font-bold">Digital Marketing</p>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[55%] md:w-[55%] flex flex-row items-center justify-evenly space-x-2">
                    <div className="w-[12rem]"> 
                      <span className="text-[1.55rem] font-bold">Generate local leads effectively.</span>
                    </div>
                    <div>
                      <img src="about_page_elements/generate_growth.png" className="h-[8rem] object-contain"/>
                    </div>        
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[2][1] */}
                  <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                    <div className="w-[12rem] pl-[2rem]"> 
                      <span className="text-[1.55rem] font-bold">Helping gyms grow & get noticed.</span>
                    </div>
                    <div className="pr-[2rem]">
                      <img src="about_page_elements/help.png" className="h-[8rem] object-contain"/>
                    </div>    
                  </div >              

                  {/* Block[2][2] */}
                  <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                    <div className="min-w-[2rem]">
                      <img src="about_page_elements/manage_social_media.png" className="h-[9rem] object-contain"/>
                    </div>
                    <div className="max-w-[13rem] mr-[2rem]">
                      <span className="text-[1.6rem] font-bold">Run Ads & manage Social Media.</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[3][1] */}
                  <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                    <div className="min-w-[2rem]">
                      <img src="about_page_elements/build_visibility.png" className="h-[8rem] object-contain"/>
                    </div>
                    <div className="max-w-[13rem] mr-[2rem]">
                      <span className="text-[1.6rem] font-bold">Build visibility & Membership.</span>
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
                    <div>
                      <img src="about_page_elements/discipl_collab.png" className="h-[7rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items center gap-1 h-full">
                      <img src="logo_white_bg.png" className="h-11 object-cover"/>
                      <span className="text-[1.25rem] font-bold">Fitness Events <br/>& Collaboration</span>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[55%] md:w-[55%] flex flex-row items-center justify-evenly space-x-2">
                    <div className="w-[12rem]"> 
                      <span className="text-[1.55rem] font-bold">Partner with Brands & Sponsors.</span>
                    </div>
                    <div>
                      <img src="about_page_elements/partner.png" className="h-[8rem] object-contain"/>
                    </div>     
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[2][1] */}
                  <div className="bg-[#FFDAD9] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                    <div className="w-[12rem] pl-[2rem]"> 
                      <span className="text-[1.55rem] font-bold">Creating real- world Fitness Experiences.</span>
                    </div>
                    <div className="pr-[2rem]">
                      <img src="about_page_elements/create_experience.png" className="h-[9rem] object-contain"/>
                    </div> 
                  </div >              

                  {/* Block[2][2] */}
                  <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                    <div className="min-w-[2rem]">
                      <img src="about_page_elements/organize.png" className="h-[9rem] object-contain"/>
                    </div>
                    <div className="max-w-[13rem]">
                      <span className="text-[1.6rem] font-bold">Organize & power Fitness Festivals.</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[3][1] */}
                  <div className="bg-[#FFF0BB] h-[9rem] text-black p-6 rounded-2xl shadow-md hover:shadow-lg transition w-[50%] md:w-[50%] flex flex-row items-center justify-between">
                    <div className="min-w-[2rem]">
                      <img src="about_page_elements/organize.png" className="h-[9rem] object-contain"/>
                    </div>
                    <div className="max-w-[13rem]">
                      <span className="text-[1.5rem] font-bold">Build a Stronger & Healthier community.</span>
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
          </div>
        </div>
      </section>

      {/* ----- MOBILE VIEW ------ */}
      {/* Our Ecosystem */}
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
                  <div className="bg-[#FFDAD9] h-[5rem] text-black rounded-2xl shadow-md hover:shadow-lg transition w-[40%] flex flex-row items-center justify-evenly space-x-1">
                    <div>
                      <img src="about_page_elements/discipl_logo_sing.png" className="h-[3rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <img src="logo_white_bg.png" className="h-4 object-cover"/>
                      <p className="text-[0.7rem] font-bold">User App</p>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[60%] flex flex-row items-center justify-evenly space-x-2">
                    <div>  
                      <p className="text-[0.7rem] font-bold">Pay with EMI & Subscription Options.</p>
                    </div>
                    <div>
                      <img src="about_page_elements/checklist.png" className="w-[10rem] object-contain"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 w-full">
                  {/* Block[2][1] */}
                  <div className="bg-[#FFDAD9] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[55%] flex flex-row items-center justify-between">
                    <div> 
                      <p className="text-[0.58rem] font-bold">Turn your Workout into Rewards..</p>
                    </div>
                    <div>
                      <img src="about_page_elements/shoe.png" className="h-[8rem] object-contain"/>
                    </div>
                  </div >              

                  {/* Block[2][2] */}
                  <div className="bg-[#FFF0BB] h-[5rem] pr-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[45%] flex flex-row items-center justify-between">
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
                      <p className="text-[0.8rem] font-bold">Earn Cashbacks & Rewards.</p>
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
                  <div className="bg-[#FFDAD9] h-[5rem] p-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[40%] flex flex-row items-center justify-evenly space-x-1 gap-1">
                    <div>
                      <img src="about_page_elements/mentor_app_logo.png" className="h-[3rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <img src="logo_white_bg.png" className="h-5"/>
                      <p className="text-[0.62rem] font-bold">Mentor App</p>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[5rem] p-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[60%] flex flex-row items-center justify-evenly space-x-2">
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
                  <div className="bg-[#FFF0BB] h-[5rem] p-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[55%] flex flex-row items-center justify-between">
                    <div>
                      <img src="about_page_elements/lens.png" className="h-[5rem] object-contain"/>
                    </div>
                    <div>
                      <p className="text-[0.6rem] font-bold">Boost visibility through<br/> User App.</p>
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
            
            {/* Ecosystem Container 3 */}
            <div className="flex flex-col justify-center items-center"> 
              {/* Container */}
              <div className="flex flex-col justify-center items-center h-[15rem] w-[20rem] gap-2">
                <div className="flex flex-row items-center justify-between space-x-2 w-full">
                  {/* Block[1][1] */}
                  <div className="bg-[#FFDAD9] h-[5rem] p-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[40%] flex flex-row items-center justify-evenly space-x-2">
                    <div>
                      <img src="about_page_elements/carry_bag.png" className="h-[3rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <img src="logo_white_bg.png" className="h-5"/>
                      <p className="text-[0.62rem] font-bold">Sponsor App</p>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[5rem] p-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[60%] flex flex-row items-center justify-evenly space-x-2">
                    <div> 
                      <p className="text-[0.6rem] font-bold ml-[1rem]">Sponsor<br/> Fitness Challenges & Prizes.</p>
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
                  <div className="bg-[#FFDAD9] h-[5rem] p-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[40%] flex flex-row items-center justify-evenly gap-1">
                    <div>
                      <img src="about_page_elements/tv_ads.png" className="h-[3rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <img src="logo_white_bg.png" className="h-3 object-cover"/>
                      <p className="text-[0.7rem] font-bold">TV Ads</p>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[60%] flex flex-row items-center justify-evenly">
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
                  <div className="bg-[#FFDAD9] h-[5rem] p-2 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[40%] flex flex-row items-center justify-evenly gap-2">
                    <div>
                      <img src="about_page_elements/digital_marketing.png" className="h-[4rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <img src="logo_white_bg.png" className="h-4 object-contain"/>
                      <p className="text-[0.5rem] font-bold">Digital Marketing</p>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[60%] flex flex-row items-center justify-evenly">
                    <div>  
                      <p className="text-[0.7rem] font-bold">Generate local leads effectively.</p>
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
                  <div className="bg-[#FFDAD9] h-[5rem] text-black rounded-2xl shadow-md hover:shadow-lg transition w-[40%] flex flex-row items-center justify-evenly space-x-1">
                    <div>
                      <img src="about_page_elements/discipl_collab.png" className="h-[3rem] object-contain"/>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <img src="logo_white_bg.png" className="h-3.5 object-contain"/>
                      <p className="text-[0.5rem] font-bold">Fitness Events <br/>& Collaboration</p>
                    </div>
                  </div >

                  {/* Block[1][2] */}
                  <div className="bg-[#DEE8FF] h-[5rem] p-4 text-black rounded-2xl shadow-md hover:shadow-lg transition w-[60%] flex flex-row items-center justify-evenly">
                    <div>  
                      <p className="text-[0.7rem] font-bold">Partner with<br/>Brands & Sponsors.</p>
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

      {/* Our Purpose */}
      <section className="w-full bg-white py-20 text-center border-gray-200 border-b">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 sm:mb-14">
          <span className="border-b-4 border-red-600 pb-1">Our Purpose</span>
        </h2>
        <p className="text-gray-700 text-base sm:text-lg lg:text-[1.25rem] max-w-3xl sm:max-w-4xl mx-auto leading-relaxed font-semibold px-4 sm:px-6 lg:px-0">
          At Discipl, we believe fitness should be accessible, exciting, and rewarding. By helping fitness centers grow, motivating individuals, and empowering brands to promote health — we’re not just building an app; we’re building a movement for a healthier world.
        </p>
      </section>
    </div>
  );
};

export default About;