import React from "react";
import "./About.css";

const About = () => {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">

          <span className="about-eyebrow">
            ABOUT DISCIPL
          </span>

          <h1>
            Making Fitness
            <br />
            <span>Fun, Rewarding, <br /> Consistent.</span>
          </h1>

          <p className="about-hero-description">
            Discipl is a fitness and wellness platform built to make
            staying fit more engaging, rewarding, and fun.
          </p>

        </div>
      </section>

      <section className="about-intro">
        <div className="about-container">

          <div className="about-section-label">
            <span>01</span>
            <span>WHO WE ARE</span>
          </div>
          <div className="about-intro-grid">

            <div className="about-intro-heading">
              <h2>
                Fitness should be
                <br />
                <span>something you enjoy.</span>
              </h2>
            </div>

            <div className="about-intro-text">

              <p>
                We use gamification, challenges, rewards, and
                community-driven experiences to turn everyday fitness
                into something people enjoy and want to keep coming back to.
              </p>

              <p>
                We connect users, trainers, and fitness centers through
                one ecosystem that encourages participation, celebrates
                progress, and builds consistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-goal">
        <div className="about-container">

          <div className="about-section-label">
            <span>02</span>
            <span>OUR GOAL</span>
          </div>

          <div className="goal-content">

            <div className="goal-number">
              02
            </div>

            <div className="goal-text">
              <h2>
                To create a fitness culture where people don't just <span>work out</span>
              </h2>
              <p>
                they enjoy it, compete, connect, and stay consistent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-vision">

        <div className="vision-content">

          <span className="vision-label">
            OUR VISION
          </span>

          <h2>
            To build a fitness
            <br />
            <span>revolution in India.</span>
          </h2>

          <p>
            By making fitness
            a fun, rewarding, and sustainable part of everyday life.
          </p>

          <div className="vision-line"></div>

          <h3>
            Discipl - Where Fitness Becomes Fun.
          </h3>

        </div>

      </section>

    </main>
  );
};

export default About;