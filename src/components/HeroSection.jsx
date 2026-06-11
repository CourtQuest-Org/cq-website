import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>GET THE APP!</h1>
        <div className="hero-buttons">
          <a href="https://courtquest.vercel.app/" className="btn-primary" target="_blank" rel="noreferrer">BETA V1</a>
          <a href="#features" className="btn-secondary">LEARN MORE ↓</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
