import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">COURTQUEST</div>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#team">The Team</a>
        <a href="#faq">FAQ</a>
      </div>
    </nav>
  );
};

export default Navbar;
