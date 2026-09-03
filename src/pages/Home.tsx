import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

type Feature = {
  number: string;
  title: string;
  text: string;
};

const features: Feature[] = [
  {
    number: '01',
    title: 'Discover',
    text: 'Find fitness experiences, events and places that fit the way you want to live.',
  },
  {
    number: '02',
    title: 'Connect',
    text: 'Stay connected with the fitness community and discover what is happening around you.',
  },
  {
    number: '03',
    title: 'Stay Disciplined',
    text: 'Track your journey, build better habits and keep moving towards your goals.',
  },
];

const Home = () => {
  const revealRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const root = revealRef.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('home-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={revealRef} className="discipl-home">
      {/* HERO */}
      {/* HERO */}
      <div className="home-hero">

        {/* Background */}
        <div className="home-hero-bg" />
        <div className="home-grain" />

        {/* Decorative circles */}
        <div className="hero-circle hero-circle-red" />
        <div className="hero-circle hero-circle-gray" />
        <div className="hero-circle hero-circle-black" />

        {/* Left content */}
        <div className="home-hero-content">

          <div className="home-eyebrow" data-reveal>
            <span className="home-eyebrow-play" />
            THE ALL-IN-ONE FITNESS ECOSYSTEM
          </div>

          <h1 data-reveal>
            The future of
            <br />
            fitness is <span>here.</span>
          </h1>

          <p className="home-hero-copy" data-reveal>
            A smarter way to discover fitness, connect with your community and build
            a disciplined lifestyle.
          </p>

          <div className="home-actions" data-reveal>

            <button
              className="home-btn home-btn-primary"
              onClick={() => navigate('/fitness-directory')}
            >
              Find fitness centers near you
              <span>↗</span>
            </button>

            {/* <button
              className="home-btn home-btn-outline"
              onClick={() => scrollTo('fitness-center')}
            >
              See how it works
              <span>↘</span>
            </button> */}

          </div>

        </div>


        {/* Right visual */}
        <div className="home-hero-dashboard" data-reveal>

          <div className="dashboard-label">
            THIS WEEK
          </div>

          <div className="dashboard-item">
            <div className="dashboard-icon">〽</div>
            <div>
              <strong>Workout logged</strong>
              <span>Push day · 48 min</span>
            </div>
          </div>

          <div className="dashboard-item">
            <div className="dashboard-icon">↗</div>
            <div>
              <strong>Progress updated</strong>
              <span>Bench +5kg this month</span>
            </div>
          </div>

          <div className="dashboard-item">
            <div className="dashboard-icon">♕</div>
            <div>
              <strong>Challenge joined</strong>
              <span>30-Day Consistency</span>
            </div>
          </div>

          <div className="dashboard-rating">
            <span>★</span>
            <div>
              <strong>4.8 average</strong>
              <small>across partner centers</small>
            </div>
          </div>

        </div>


        {/* Stats */}
        <div className="home-stats" data-reveal>

          <div className="home-stat-card home-stat-card-1">
            <strong>500+</strong>
            <span>Workouts Logged</span>
          </div>

          <div className="home-stat-card home-stat-card-2">
            <strong>120+</strong>
            <span>Partner Gyms</span>
          </div>

          <div className="home-stat-card home-stat-card-3">
            <strong>48</strong>
            <span>Challenges</span>
          </div>

          <div className="home-stat-card home-stat-card-4">
            <strong>4.8</strong>
            <span>Rating</span>
          </div>

        </div>

      </div>
      {/* <section className="home-section home-intro"> */}
      {/* <div className="home-section-grid">
          <div className="home-section-label" data-reveal>
            <span>01</span>
            WHY DISCIPL
          </div>
          <div>
            <h2 data-reveal>
              Fitness is not just a workout.
              <em> It is a lifestyle.</em>
            </h2>
            <p className="home-lead" data-reveal>
              DISCIPL brings the fitness journey into one place — helping you discover,
              connect, participate and stay consistent.
            </p>
          </div>
        </div> */}


      {/* MARQUEE */}
      <div className="home-marquee" aria-hidden="true">
        <div className="home-marquee-track">
          {[
            'FITNESS',
            'COMMUNITY',
            'EVENTS',
            'DISCIPLINE',
            'WELLNESS',
            'FITNESS',
            'COMMUNITY',
            'EVENTS',
          ].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item} <b>✦</b>
            </span>
          ))}
        </div>
      </div>

      {/* INTRO / STATS */}

      {/* about */}
      <div className="ecosystem-section">

        {/* Decorative circles for ecosystem */}
        <div className="hero-circle hero-circle-red ecosystem-circle-1" />
        <div className="hero-circle hero-circle-red ecosystem-circle-2" />

        <div className="ecosystem-container">

          {/* ECOSYSTEM HEADING */}
          <div className="ecosystem-heading-section" data-reveal>
            <div className="home-section-label">
              <span className="home-eyebrow-play" />
              Our ecosystem
            </div>

            <h2>
              Two apps. <span>One shared source of truth.</span>
            </h2>
          </div>

          {/* TWO CARDS */}
          <div className="ecosystem-grid">

            {/* Mentor App - Left */}
            <div className="ecosystem-card ecosystem-card-mentor">

              <div className="ecosystem-card-header">
                <span className="ecosystem-card-label">
                  For gym owners & trainers
                </span>

                <h3>Mentor App</h3>
              </div>

              <p className="ecosystem-card-intro">
                Run the business side of fitness without spreadsheets, and give every
                client a plan built for them.
              </p>

              <div className="ecosystem-feature">
                <div className="ecosystem-feature-icon">▣</div>
                <div>
                  <h4>Workouts built on history</h4>
                  <p>
                    Trainers assign each client's next plan based on what they've
                    actually done before — not a generic template.
                  </p>
                </div>
              </div>

              <div className="ecosystem-feature">
                <div className="ecosystem-feature-icon">♙</div>
                <div>
                  <h4>Clients, memberships & renewals</h4>
                  <p>
                    One place to manage every client, every membership, every renewal
                    date, without the busywork.
                  </p>
                </div>
              </div>

              <div className="ecosystem-feature">
                <div className="ecosystem-feature-icon">▤</div>
                <div>
                  <h4>Automated payments</h4>
                  <p>
                    Payments and daily front-desk operations run themselves, so staff
                    spend time on the floor, not the ledger.
                  </p>
                </div>
              </div>

              <div className="ecosystem-feature">
                <div className="ecosystem-feature-icon">↗</div>
                <div>
                  <h4>Visibility that compounds</h4>
                  <p>
                    Every center on Mentor is discoverable inside the Customer App —
                    new members find you while you sleep.
                  </p>
                </div>
              </div>

            </div>


            {/* Customer App - Right */}
            <div className="ecosystem-card ecosystem-card-customer">

              <div className="ecosystem-card-header">
                <span className="ecosystem-card-label">
                  For fitness lovers
                </span>

                <h3>Customer App</h3>
              </div>

              <p className="ecosystem-card-intro">
                Everything a member needs to find a center, train consistently, and
                see the progress add up.
              </p>

              <div className="ecosystem-feature">
                <div className="ecosystem-feature-icon">⌖</div>
                <div>
                  <h4>Find your fitness center</h4>
                  <p>
                    Search and compare gyms, studios, and trainers near you in seconds.
                  </p>
                </div>
              </div>

              <div className="ecosystem-feature">
                <div className="ecosystem-feature-icon">↗</div>
                <div>
                  <h4>Log it. Track it. Improve.</h4>
                  <p>
                    Every workout logged, every rep counted, progress laid out plainly
                    over time.
                  </p>
                </div>
              </div>

              <div className="ecosystem-feature">
                <div className="ecosystem-feature-icon">✦</div>
                <div>
                  <h4>Challenges & rewards</h4>
                  <p>
                    Turn consistency into competition — join challenges and earn real
                    rewards for showing up.
                  </p>
                </div>
              </div>

              <div className="ecosystem-feature">
                <div className="ecosystem-feature-icon">▤</div>
                <div>
                  <h4>Flexible payments</h4>
                  <p>
                    Pay for memberships with EMI or subscription options that fit how
                    you actually budget.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      <div className="bg-white w-full pt-12">
        {/* =========================================================
           DISCIPL SCREENS BANNER
        ========================================================= */}
        <div className="w-full max-w-6xl mx-auto px-4 py-20">
          <div className="bg-[#6b6969] rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Subtle background diagonal pattern */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none" style={{ background: 'linear-gradient(45deg, transparent 49%, #ef2b2d 49%, #ef2b2d 51%, transparent 51%)', backgroundSize: '40px 40px' }}></div>

            <div className="flex items-center gap-6 relative z-10">
              <div className="w-14 h-14 bg-[#d92325] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <div>
                <p className="text-gray-300 text-xs font-bold uppercase tracking-widest mb-1">Also part of the family</p>
                <h3 className="text-white text-2xl font-bold mb-2">DISCIPL Screens</h3>
                <p className="text-gray-300 text-sm max-w-md">A digital advertising network of in-gym displays across partner fitness centers — a separate vertical of the DISCIPL family.</p>
              </div>
            </div>

            <button onClick={() => navigate('/discipl-screens')}
              className="relative z-10 bg-[#d92325] hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              Learn more
              <span className="text-xl leading-none">→</span>
            </button>
          </div>
        </div>

        {/* =========================================================
           QUOTE SECTION
        ========================================================= */}
        <div className="w-full max-w-4xl mx-auto px-4 pb-24 text-center">
          <div className="w-12 h-12 bg-[#8B0000] rounded-full mx-auto flex items-center justify-center mb-8 shadow-lg shadow-red-900/20">
            <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4l12 6-12 6z"></path>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-8">
            "Fitness should be accessible, exciting, and rewarding. We're not just building an app - we're building a movement for a healthier world."
          </h2>
          <p className="text-gray-500 font-medium text-sm tracking-widest uppercase">— The DISCIPL team</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
