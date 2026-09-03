import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DisciplScreens.css';

const scienceCards = [
  { id: 1, title: 'MERE EXPOSURE EFFECT', desc: 'The more people see a brand, the more they tend to like and trust it.' },
  { id: 2, title: 'RULE OF SEVEN', desc: "People usually need multiple exposures before they're ready to buy." },
  { id: 3, title: 'TOP-OF-MIND AWARENESS', desc: 'The brand that comes to mind first is often the brand that gets chosen.' },
  { id: 4, title: 'MENTAL AVAILABILITY', desc: "Brands grow when they're easy to recall in buying situations." },
  { id: 5, title: 'PHYSICAL AVAILABILITY', desc: 'A brand must be easy to buy when people want it.' },
  { id: 6, title: 'BORROWED TRUST', desc: 'A trusted environment can increase trust in the brands shown within it.' },
  { id: 7, title: 'DWELL TIME', desc: 'Longer exposure generally increases the chance a message is noticed and remembered.' },
  { id: 8, title: 'AVAILABILITY HEURISTIC', desc: "People judge what's familiar as more common, reliable and important." },
  { id: 9, title: 'RECENCY EFFECT', desc: 'The most recently seen information is often remembered better.' },
  { id: 10, title: 'RIGHT MENTAL STATE', desc: 'A clear mind processes messages more effectively.' }
];

const gymsData = [
  { id: 1, name: 'REVIVE FITNESS CENTER', location: 'Medical College, Calicut' },
  { id: 2, name: 'WELLNESS GYM', location: 'Medical College, Calicut' },
  { id: 3, name: 'TITAN FITNESS', location: 'Mankavu, Calicut' },
  { id: 4, name: 'GREENS FITNESS', location: 'Mankavu, Calicut' },
  { id: 5, name: 'DETOX FITNESS', location: 'Kovoor, Calicut' },
  { id: 6, name: 'FITPRO FITNESS', location: 'Eranhipalam, Calicut' },
  { id: 7, name: 'FITFAT STUDIO', location: 'Thondayad, Calicut' },
  { id: 8, name: 'PRIMAL FITNESS', location: 'Palazhi Rd, Calicut' },
  { id: 9, name: 'IFITNESS GYM', location: 'Palazhi, Calicut' },
  { id: 10, name: 'CORE FITNESS', location: 'Cherooty Rd, Calicut' },
  { id: 11, name: 'ALPHA FITNESS', location: 'Nanminda, Calicut' },
  { id: 12, name: 'ALPHA FITNESS', location: 'Chelannur, Calicut' },
  { id: 13, name: 'ALPHA FITNESS', location: 'Atholi, Calicut' },
  { id: 14, name: 'NEW WORLD LADIES GYM', location: 'Mukkam, Calicut' },
  { id: 15, name: 'NEW WORLD GYM', location: 'Mukkam, Calicut' }
];

const faqData = [
  { id: 1, question: 'IS THERE A FIXED PACKAGE?', answer: 'We offer flexible packages based on your campaign duration, target locations, and objectives. Contact us for a custom quote.' },
  { id: 2, question: 'DO I NEED TO BE A FITNESS BRAND?', answer: 'Not at all. Any brand looking to reach a highly engaged, captive audience can benefit from advertising on our screens.' },
  { id: 3, question: 'CAN I USE MY OWN CREATIVE?', answer: 'Yes, you can provide your own creative. If you need help, our team can design a high-converting ad for you.' },
  { id: 4, question: 'HOW FAST CAN I GO LIVE?', answer: 'Once your creative is approved and your plan is finalized, your campaign can go live within 24 to 48 hours.' },
  { id: 5, question: 'HOW DO I GET PRICING?', answer: 'Use the quote builder above to select your gyms and duration, and we will send you customized pricing instantly via WhatsApp.' }
];

const DisciplScreens = () => {
  const navigate = useNavigate();
  const phoneRef = useRef<HTMLDivElement>(null);
  const [exploredCards, setExploredCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  // Plan Section State
  const [selectedGyms, setSelectedGyms] = useState<number[]>([]);
  const [brandName, setBrandName] = useState('');
  const [category, setCategory] = useState('');
  const [needHelp, setNeedHelp] = useState(false);
  const [duration, setDuration] = useState('1 Month');
  
  // FAQ State
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  
  const toggleFaq = (id: number) => {
    setOpenFaqId(prev => prev === id ? null : id);
  };

  const toggleGymSelection = (id: number) => {
    setSelectedGyms(prev => prev.includes(id) ? prev.filter(gId => gId !== id) : [...prev, id]);
  };

  const selectAllGyms = () => setSelectedGyms(gymsData.map(g => g.id));
  const clearSelection = () => setSelectedGyms([]);

  const isFormValid = selectedGyms.length > 0 && brandName.trim() !== '';

  const selectedGymNames = selectedGyms.map(id => gymsData.find(g => g.id === id)?.name).join(', ');
  const whatsappMessage = `Hi! I'd like a quotation for _${selectedGyms.length} DISCIPL Screens_.\n\nGyms: ${selectedGymNames}\nBrand: ${brandName}\nCategory: ${category}\nDuration: ${duration}\nNeed Help with Ad: ${needHelp ? 'Yes' : 'No'}\n\n\n\n\nPlease send me a quotation.`;
  const whatsappUrl = `https://wa.me/919746488282?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCardClick = (id: number) => {
    // Toggle flip state
    if (flippedCards.includes(id)) {
      setFlippedCards(flippedCards.filter(cardId => cardId !== id));
    } else {
      setFlippedCards([...flippedCards, id]);
    }

    // Track as explored if not already (for progress counter)
    if (!exploredCards.includes(id)) {
      setExploredCards([...exploredCards, id]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    const { left, top, width, height } = phoneRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = -(e.clientY - top - height / 2) / 20;
    phoneRef.current.style.transform = `perspective(450px) rotateY(${x}deg) rotateX(${y}deg) scale(1)`;
  };

  const handleMouseLeave = () => {
    if (!phoneRef.current) return;
    phoneRef.current.style.transform = `perspective(450px) rotateY(0deg) rotateX(0deg) scale(1)`;
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="ds-page-container">

      {/* Navbar */}
      <nav className="ds-navbar">
        <div className="ds-nav-logo-wrapper" onClick={() => navigate('/')}>
          <span className="text-2xl font-bold text-black"><img className="h-8" src="/logo_white_bg.png" alt="logo" /></span>
        </div>

        <div className="ds-nav-right">
          <div className="ds-nav-links">
            <button onClick={() => scrollTo('why-it-works')} className="ds-nav-link">Why It Works</button>
            <button onClick={() => scrollTo('thescience')} className="ds-nav-link">The Science</button>
            <button onClick={() => scrollTo('specs')} className="ds-nav-link">Specs</button>
          </div>

          <button onClick={() => scrollTo('plan-section')} className="ds-nav-btn">
            Build Your Plan
          </button>
        </div>
      </nav>

      <main className="ds-main-content">
        {/* 1. Hero Section */}
        <section className="ds-hero-section">
          <div className="ds-hero-glow"></div>

          <div className="ds-hero-content">
            {/* Left Content */}
            <div className="ds-hero-text-wrapper">
              <p className="ds-hero-subtitle">
                Premium DOOH, Calicut
              </p>

              <h1 className="ds-hero-title">
                REPETITION <br /> MOVES <br />
                <span className="ds-hero-title-highlight">
                  DECISION MAKERS.
                  <svg className="ds-hero-title-underline" viewBox="0 0 400 20" preserveAspectRatio="none">
                    <path d="M0,10 Q100,0 200,10 T400,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <div className="ds-hero-desc rotator-line">
                Built for brands in 
                <span className="rotator">
                  <span>Real Estate</span>
                  <span>Finance</span>
                  <span>Hospitality</span>
                  <span>Automobiles</span>
                  <span>Education</span>
                  <span>Retail</span>
                </span>
              </div>

              <div className="ds-hero-buttons">
                <button onClick={() => scrollTo('plan-section')} className="ds-btn-primary">
                  Build Your Plan
                </button>
                <button onClick={() => scrollTo('network')} className="ds-btn-outline">
                  See The Gyms
                </button>
              </div>
            </div>

            {/* Right Mockup */}
            <div className="ds-mockup-wrapper">
              <div
                className="ds-mockup-phone"
                ref={phoneRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Screen */}
                <div className="ds-mockup-screen">
                  {/* Fake UI */}
                  <div className="ds-mockup-live">
                    <div className="ds-mockup-live-dot"></div>
                    <span className="ds-mockup-live-text">Live 1080p</span>
                  </div>

                  {/* Grid pattern overlay */}
                  <div className="ds-mockup-grid"></div>

                  <div className="ds-mockup-content">
                    <div className="ds-mockup-content-top">Live Now</div>
                    <div className="ds-mockup-content-title">YOUR AD</div>
                    <div className="ds-mockup-content-line"></div>
                  </div>
                </div>

                {/* Floating Tags */}
                <div className="ds-tag-top">
                  <span className="ds-tag-top-text-red">43"</span>
                  <span className="ds-tag-top-text-gray">Samsung Display</span>
                </div>

                <div className="ds-tag-bottom">
                  <span className="ds-tag-bottom-text-red">15</span>
                  <span className="ds-tag-bottom-text-gray">Screens Live</span>
                </div>
              </div>

              <div className="ds-mockup-caption">
                <p className="ds-mockup-caption-text">43" DISPLAY, RUNNING <br /> RIGHT NOW. TAP TO SKIP.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Marquee & Stats Section */}
        <section id="network" className="ds-network-section">
          {/* Marquee 1 */}
          <div className="ds-marquee-black">
            <div className="ds-marquee-track animate-scroll">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="ds-marquee-item">
                  <span>Greens Fitness</span>
                  <span className="ds-marquee-arrow-red">▸</span>
                  <span>Fitfat Studio</span>
                  <span className="ds-marquee-arrow-red">▸</span>
                  <span>Core Fitness</span>
                  <span className="ds-marquee-arrow-red">▸</span>
                  <span>Alpha Fitness</span>
                  <span className="ds-marquee-arrow-red">▸</span>
                </div>
              ))}
            </div>
          </div>
          {/* Marquee 2 */}
          <div className="ds-marquee-red">
            <div className="ds-marquee-track animate-scroll-reverse">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="ds-marquee-item">
                  <span>Medical College</span>
                  <span className="ds-marquee-arrow-white">▸</span>
                  <span>Revive Fitness Center</span>
                  <span className="ds-marquee-arrow-white">▸</span>
                  <span>New World Gym</span>
                  <span className="ds-marquee-arrow-white">▸</span>
                  <span>Alpha Fitness</span>
                  <span className="ds-marquee-arrow-white">▸</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ds-quote-wrapper">
            <h2 className="ds-quote-text">
              “Doing business without advertising is like winking at a girl in the dark. You know what you're doing, but nobody else does.”
            </h2>
            <p className="ds-quote-author">
              STEUART HENDERSON BRITT
            </p>
          </div>

          <div className="ds-stats-wrapper">
            <div className="ds-stat-card">
              <span className="ds-stat-number">15</span>
              <span className="ds-stat-label">SCREENS</span>
            </div>
            <div className="ds-stat-card">
              <span className="ds-stat-number">10+<br />HRS</span>
              <span className="ds-stat-label">DAILY VISIBILITY</span>
            </div>
            <div className="ds-stat-card">
              <span className="ds-stat-number">1-2</span>
              <span className="ds-stat-label">HRS DWELL TIME</span>
            </div>
            <div className="ds-stat-card">
              <span className="ds-stat-number-sm">₹2,500</span>
              <span className="ds-stat-label">CAMPAIGNS FROM</span>
            </div>
          </div>
        </section>

        {/* 3. Why It Works Section */}
        <section id="why-it-works" className="ds-why-section">
          <div className="ds-section-header">
            <div className="ds-section-header-center">
              <span className="ds-section-subtitle">Why It Works</span>
              <h2 className="ds-section-title">ATTENTION THAT <br /> ALREADY SPENDS</h2>
            </div>

            <div className="ds-why-grid">
              <div className="ds-why-card-top-left">
                <div className="ds-why-bullet"></div>
                <h3 className="ds-why-heading">LIFESTYLE SPENDING</h3>
                <p className="ds-why-text">
                  Members already invest in their health, appearance and status. They're buyers, not browsers.
                </p>
              </div>
              <div className="ds-why-card-top-right">
                <div className="ds-why-bullet"></div>
                <h3 className="ds-why-heading">EXTENDED DWELL</h3>
                <p className="ds-why-text">
                  1 to 2 hours of focused, low distraction attention per visit.
                </p>
              </div>
              <div className="ds-why-card-bottom-left">
                <div className="ds-why-bullet"></div>
                <h3 className="ds-why-heading">REPEATED VISIBILITY</h3>
                <p className="ds-why-text">
                  Multiple visits a week compound into real recall.
                </p>
              </div>
              <div className="ds-why-card-bottom-right">
                <div className="ds-why-bullet"></div>
                <h3 className="ds-why-heading">TRUSTED ENVIRONMENT</h3>
                <p className="ds-why-text">
                  Ads run inside spaces members already trust and return to.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. How It Works Section */}
        <section className="ds-how-section">
          <div className="ds-how-container">
            <div className="ds-how-header-center">
              <span className="ds-section-subtitle">How It Works</span>
              <h2 className="ds-section-title">
                <span className="ds-how-title-highlight">LIVE IN THREE STEPS</span>
              </h2>
            </div>

            <div className="ds-how-grid">
              {/* Connecting line for desktop */}
              <div className="ds-how-line"></div>

              <div className="ds-how-card">
                <span className="ds-how-number">01</span>
                <h3 className="ds-how-heading">CHOOSE SCREENS</h3>
                <p className="ds-how-text">Pick the gyms and neighborhoods that match your customer.</p>
              </div>

              <div className="ds-how-card">
                <span className="ds-how-number">02</span>
                <h3 className="ds-how-heading">SEND CREATIVE</h3>
                <p className="ds-how-text">Share your own images or video, or have DISCIPL design it.</p>
              </div>

              <div className="ds-how-card">
                <span className="ds-how-number">03</span>
                <h3 className="ds-how-heading">GO LIVE</h3>
                <p className="ds-how-text">Your ad joins the loop and starts repeating from day one.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Hardware Section */}
        <section id="specs" className="ds-hardware-section">
          <div className="ds-hardware-container">
            <span className="ds-hardware-subtitle">The Hardware</span>
            <h2 className="ds-hardware-title">BUILT TO RUN ALL DAY</h2>

            <div className="ds-hardware-pills">
              <div className="ds-hardware-pill">43" Samsung Commercial Display</div>
              <div className="ds-hardware-pill">20 Sec Per Ad</div>
              <div className="ds-hardware-pill">Back On Screen Every 5 Minutes</div>
              <div className="ds-hardware-pill">Bring Your Own Creative, Or We Build It</div>
            </div>

            <p className="ds-hardware-desc">
              Your ad returns to the screen at least once every<br />
              five minutes, all day, every day it's live. No<br />
              scrolling past it, members simply see it again on<br />
              their next set.
            </p>

            <div className="ds-hardware-divider"></div>

            <div className="ds-hardware-locations">
              <div className="ds-hardware-location">
                <div className="ds-hardware-bullet"></div> Water Stations
              </div>
              <div className="ds-hardware-location">
                <div className="ds-hardware-bullet"></div> Cardio Zones
              </div>
              <div className="ds-hardware-location">
                <div className="ds-hardware-bullet"></div> Warm Up Areas
              </div>
              <div className="ds-hardware-location">
                <div className="ds-hardware-bullet"></div> Reception
              </div>
            </div>
          </div>
        </section>
        {/* 6. Science Section */}
        <section id="thescience" className="ds-science-section">
          <div className="ds-science-container">
            <div className="ds-science-header">
              <span className="ds-science-subtitle">The Science</span>
              <h2 className="ds-science-title">TEN REASONS THIS<br />ACTUALLY WORKS</h2>
              <p className="ds-science-desc">
                Not slogans, tested principles from advertising and psychology research.<br />
                Tap a card. DISCIPL Screens is built around every one of them.
              </p>
            </div>

            <div className="ds-science-progress-wrapper">
              <div className="ds-science-progress-line"></div>
              <span className="ds-science-progress-text">{exploredCards.length} of 10 explored</span>
            </div>

            <div className="ds-science-grid">
              {scienceCards.map((card) => {
                const isFlipped = flippedCards.includes(card.id);
                return (
                  <div
                    key={card.id}
                    className={`ds-science-card ${isFlipped ? 'explored' : ''}`}
                    onClick={() => handleCardClick(card.id)}
                  >
                    <div className="ds-science-card-inner">
                      <div className="ds-science-card-front">
                        <span className="ds-science-card-number">{card.id.toString().padStart(2, '0')}</span>
                        <h3 className="ds-science-card-title">{card.title}</h3>
                        <span className="ds-science-card-action">TAP TO REVEAL</span>
                      </div>
                      <div className="ds-science-card-back">
                        <p className="ds-science-card-back-text">{card.desc}</p>
                        <div className="ds-science-card-back-footer">
                          <span className="ds-science-card-check">✓</span>
                          <span className="ds-science-card-built">BUILT INTO DISCIPL<br />SCREENS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="ds-science-footer">
              <p className="ds-science-footer-text">All ten. That's the whole reason DISCIPL Screens works.</p>
              <button onClick={() => scrollTo('plan-section')} className="ds-science-footer-btn">Build Your Plan</button>
            </div>
          </div>
        </section>
        {/* 7. Plan Section */}
        <section id="plan-section" className="ds-plan-section">
          <div className="ds-plan-container">
            <div className="ds-plan-header">
              <span className="ds-plan-subtitle">Get Your Quote</span>
              <h2 className="ds-plan-title">BUILD YOUR SCREEN<br />PLAN</h2>
              <p className="ds-plan-desc">
                Tick the gyms you want, pick a duration, and send it straight to us on<br />
                WhatsApp. We'll reply with a quotation.
              </p>
            </div>

            <div className="ds-plan-actions">
              <button onClick={selectAllGyms} className="ds-plan-action-btn">Select All 15</button>
              <button onClick={clearSelection} className="ds-plan-action-btn">Clear Selection</button>
            </div>

            <div className="ds-plan-gyms-grid">
              {gymsData.map(gym => (
                <label key={gym.id} className={`ds-plan-gym-card ${selectedGyms.includes(gym.id) ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    className="ds-plan-checkbox"
                    checked={selectedGyms.includes(gym.id)}
                    onChange={() => toggleGymSelection(gym.id)}
                  />
                  <div className="ds-plan-gym-info">
                    <span className="ds-plan-gym-name">{gym.name}</span>
                    <span className="ds-plan-gym-location">{gym.location}</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="ds-plan-inputs-row">
              <div className="ds-plan-input-group">
                <label className="ds-plan-label">YOUR BRAND NAME</label>
                <input
                  type="text"
                  className="ds-plan-input"
                  placeholder="e.g. Zenith Realty"
                  value={brandName}
                  onChange={e => setBrandName(e.target.value)}
                />
              </div>
              <div className="ds-plan-input-group">
                <label className="ds-plan-label">CATEGORY</label>
                <input
                  type="text"
                  className="ds-plan-input"
                  placeholder="e.g. Real Estate, Finance, Automobiles"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                />
              </div>
            </div>

            <label className="ds-plan-help-card">
              <input
                type="checkbox"
                className="ds-plan-checkbox"
                checked={needHelp}
                onChange={e => setNeedHelp(e.target.checked)}
              />
              <div className="ds-plan-help-info">
                <span className="ds-plan-help-title">I NEED HELP CREATING MY AD</span>
                <span className="ds-plan-help-desc">Check this if you don't have creative ready. DISCIPL will design it for you.</span>
              </div>
            </label>

            <div className="ds-plan-duration-section">
              <label className="ds-plan-label">CAMPAIGN DURATION</label>
              <div className="ds-plan-duration-pills">
                {['1 Week', '1 Month', '3 Months', '6 Months'].map(dur => (
                  <button
                    key={dur}
                    className={`ds-plan-duration-pill ${duration === dur ? 'active' : ''}`}
                    onClick={() => setDuration(dur)}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>

            <div className="ds-plan-footer-box">
              <div className="ds-plan-footer-info">
                <h3 className="ds-plan-footer-selected">{selectedGyms.length} SCREENS SELECTED</h3>
                <span className="ds-plan-footer-duration">Duration: {duration}</span>
              </div>
              <div className="ds-plan-footer-action">
                <a
                  href={isFormValid ? whatsappUrl : '#'}
                  target={isFormValid ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`ds-plan-submit-btn ${!isFormValid ? 'disabled' : ''}`}
                  onClick={(e) => {
                    if (!isFormValid) e.preventDefault();
                  }}
                  style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}
                >
                  Send To WhatsApp For Quote
                </a>
                {!isFormValid && (
                  <span className="ds-plan-submit-hint">Add your brand name and pick at least one screen</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ Section */}
        <section className="ds-faq-section">
          <div className="ds-faq-container">
            <span className="ds-faq-subtitle">Before You Ask</span>
            <h2 className="ds-faq-title">QUICK ANSWERS</h2>

            <div className="ds-faq-list">
              {faqData.map(faq => (
                <div 
                  key={faq.id} 
                  className={`ds-faq-item ${openFaqId === faq.id ? 'open' : ''}`}
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div className="ds-faq-question-row">
                    <span className="ds-faq-question">{faq.question}</span>
                    <span className="ds-faq-icon">{openFaqId === faq.id ? '-' : '+'}</span>
                  </div>
                  <div className="ds-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. CTA Section */}
        <section className="ds-cta-section">
          <div className="ds-cta-bg-shape"></div>
          <div className="ds-cta-container">
            <span className="ds-cta-subtitle">Get Started</span>
            <h2 className="ds-cta-title">PUT YOUR BRAND WHERE<br/>ATTENTION ALREADY LIVES.</h2>
            <p className="ds-cta-desc">
              Custom plans by duration, location and objective. Campaigns start from ₹2,500.
            </p>

            <div className="ds-cta-buttons">
              <button onClick={() => scrollTo('plan-section')} className="ds-cta-btn-primary">
                <span className="tri"></span> Build Your Plan
              </button>
              <a href="tel:+919746488282" className="ds-cta-btn-outline">Call Now</a>
              <a href="https://thediscipl.com" target="_blank" rel="noopener noreferrer" className="ds-cta-btn-outline">thediscipl.com</a>
            </div>
          </div>
        </section>
      </main>

      {/* 10. Footer */}
      <footer className="ds-footer">
        <div className="ds-footer-container">
          <div className="ds-footer-logo">
            <img className="h-8" src="logo_white_bg.png" alt="Discipl Screens Logo" />
          </div>
          <div className="ds-footer-info">
            <span className="ds-footer-tag">INVITED GYMS ONLY</span>
            <span className="ds-footer-slash">/</span>
            <span className="ds-footer-text">15 SCREENS</span>
            <span className="ds-footer-slash">/</span>
            <span className="ds-footer-text">CALICUT, KERALA</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919746488282?text=Hi!%20I'd%20like%20to%20know%20more%20about%20DISCIPL%20Screens." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="ds-fab"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
        </svg>
      </a>
    </div>
  );
};

export default DisciplScreens;
