import React from "react";
import { Gamepad2, Trophy, Gift, Users, TrendingUp } from "lucide-react";
import "./About.css";

const About = () => {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-hero-left">
            <span className="about-eyebrow">ABOUT US</span>
            <h1>
              Discipl
              <br />
              <span>Making Fitness Fun. Rewarding. Consistent.</span>
            </h1>
          </div>
          <div className="about-hero-right">
            <p className="about-hero-description">
              Discipl is a fitness and wellness technology platform built to make fitness more engaging, rewarding, and fun.
              We use gamification, challenges, rewards, and community-driven experiences to turn everyday fitness
               into something people enjoy and stay consistent with.
            </p>
            <p className="about-hero-description">
              Discipl brings users, trainers, and fitness centers together in one ecosystem, encouraging people to participate, compete, connect, track their progress, and celebrate their achievements.
            </p>
          </div>
        </div>
      </section>

      <section className="about-vision">
        <div className="vision-content">
          <span className="vision-label">OUR VISION</span>
          <h2>
            To create a fitness
            <br />
            <span>revolution in India.</span>
          </h2>
          <p>
            By making fitness a fun, rewarding, and sustainable part of everyday life.
          </p>
        </div>
      </section>

      <section className="about-intro">
        <div className="about-container">
          <div className="about-section-label">
            <span>01</span>
            <span>WHAT WE BELIEVE</span>
          </div>
          <div className="about-intro-grid">
            <div className="about-intro-heading">
              <h2>
                Fitness shouldn't
                <br />
                <span>feel like a chore.</span>
              </h2>
            </div>
            <div className="about-intro-text">
              <p>
                We believe that when fitness becomes fun, social, competitive, and rewarding, people are more likely to stay consistent.
              </p>
              <p>
                Motivation gets you started. Discipline keeps you going. Discipl makes the journey more rewarding.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-goal">
        <div className="about-container">
          <div className="about-section-label">
            <span>02</span>
            <span>WHAT WE DO</span>
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <h3><Gamepad2 className="feature-icon" /> Gamify Fitness</h3>
              <p>Turn workouts and fitness activities into engaging challenges and experiences.</p>
            </div>
            <div className="feature-item">
              <h3><Trophy className="feature-icon" /> Create Challenges</h3>
              <p>Give people goals to chase, compete in, and achieve together.</p>
            </div>
            <div className="feature-item">
              <h3><Gift className="feature-icon" /> Reward Consistency</h3>
              <p>Recognize participation, achievements, and commitment to fitness.</p>
            </div>
            <div className="feature-item">
              <h3><Users className="feature-icon" /> Build Communities</h3>
              <p>Connect people, trainers, and fitness centers to create stronger fitness communities.</p>
            </div>
            <div className="feature-item">
              <h3><TrendingUp className="feature-icon" /> Track Progress</h3>
              <p>Help users stay aware of their fitness journey and celebrate their progress.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-founder">
        <div className="about-container">
          <div className="about-section-label">
            <span>03</span>
            <span>MEET THE FOUNDER</span>
          </div>
          <div className="founder-content">
            <div className="founder-info">
              <h2>Arpan Subhjith</h2>
              <span className="founder-title">Founder, Discipl</span>
              <p>
                Fitness entrepreneur, wellness coach, and natural bodybuilding athlete passionate about building a stronger fitness culture in India.
                In 2026, Arpan won 1st Place - Mr. Calicut and 3rd Place - Mr. Kerala in natural bodybuilding competitions.
              </p>
              <p className="founder-quote">
                "His vision is simple: make fitness something people enjoy, not something they force themselves to do."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <div className="mission-content">
          <span className="mission-label">OUR MISSION</span>
          <h2>
            To make people move more,
            <br />
            <span>enjoy fitness more, and stay consistent for life.</span>
          </h2>
          <p>
            We are building Discipl to make fitness a part of everyday culture - one workout, one challenge, and one achievement at a time.
          </p>

          <div className="mission-line"></div>

          <h3>DISCIPL</h3>
          <p className="mission-taglines">
            Where Fitness Becomes Fun.<br />
            Where Consistency Gets Rewarded.<br />
            Where a Fitness Culture Begins.
          </p>
        </div>
      </section>

    </main>
  );
};

export default About;