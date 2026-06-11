import React from 'react';

const FeaturesSection = () => {
  return (
    <section id="features" className="section-container">
      <h2 className="section-title">START YOUR QUEST</h2>
      
      <div className="feature-block">
        <div className="feature-text">
          <h3>FIND COURTS QUICK</h3>
          <p>Navigate effortlessly to available courts near you. Our intuitive interface shows real-time court availability within your current location, powered by accurate Google Maps data. No more waiting at busy courts or time wasted driving around.</p>
        </div>
        <div className="feature-icon">
          {/* Placeholder for Handshake Icon */}
          <div className="icon-placeholder">🤝</div>
        </div>
      </div>

      <div className="feature-block reverse">
        <div className="feature-text">
          <h3>JUST A BUTTON</h3>
          <p>Find the perfect court based on your location and sport preference. Just open the app, press a button and embark on your quest!</p>
          <p className="small-text">More sports coming soon</p>
        </div>
        <div className="feature-icon">
           {/* Placeholder for Users Icon */}
           <div className="icon-placeholder">👥</div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
