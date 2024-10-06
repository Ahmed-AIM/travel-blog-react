import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleScrollToSection = (sectionId) => {
    navigate('/'); // Ensure we are on the homepage
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer-nav">
          <ul>
            <li>
              <Link to="/" className="footer-link">Home</Link>
            </li>
            <li>
              <button
                className="footer-link"
                onClick={() => handleScrollToSection('about-section')}
              >
                About
              </button>
              <button
                className="footer-link"
                onClick={() => handleScrollToSection('contact-us-section')}
              >
                Contact
              </button>

            </li>
            <li>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            </li>
          </ul>
        </nav>
        <div className="Footer-social-media" style={{ display: 'flex', gap: '10px' }}>
          <a href="https://facebook.com" className="Footer-social-link">Facebook</a>
          <a href="https://twitter.com" className="Footer-social-link">Twitter</a>
          <a href="https://instagram.com" className="Footer-social-link">Instagram</a>
        </div>
        <p>&copy; 2024 Travel Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
