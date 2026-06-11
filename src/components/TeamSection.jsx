import React from 'react';

const TeamSection = () => {
  const teamMembers = [
    { name: "AADHYA MITTAPALLI", role: "FOUNDER AND EXECUTIVE LEAD" },
    { name: "VEDANT CHAUDHARI", role: "TECHNICAL LEAD" },
    { name: "VIHAAN KEREKATTE", role: "EXECUTIVE DEVELOPER" },
    { name: "KEERTHANA THIRUKONDA", role: "SOCIAL MEDIA AND DESIGN" },
    { name: "JIA MATHUR", role: "MARKETING AND OUTREACH" },
    { name: "VEDANTH IYENGAR", role: "FINANCE MANAGER" },
    { name: "KEERTHANA KARTHIKEYAN", role: "HEAD FRONTEND DEVELOPER" },
    { name: "VIHAAN KINRA", role: "FRONTEND DEVELOPER" }
  ];

  return (
    <section id="team" className="section-container team-section">
      <h2 className="section-title">OUR TEAM</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <div className="team-photo-placeholder"></div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
