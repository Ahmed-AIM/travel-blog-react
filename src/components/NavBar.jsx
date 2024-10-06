import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../store/AuthContext";

import '../styles/NavBar.css';

const NavBar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleScrollToSection = (sectionId) => {
    const currentPath = window.location.pathname;
    if (currentPath !== '/') {
      navigate('/');
    }
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, currentPath === '/' ? 0 : 100);
  };

  const handleAddBlogClick = () => {
    if (user) {
      navigate("/add-blog");
    } else {
      navigate("/login", { state: { from: "/add-blog" } });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-link">Logo</Link>
        </div>
        <ul className="navbar-menu">
          <li>
            <button
              className="navbar-link"
              onClick={() => handleScrollToSection('about-section')}
            >
              About
            </button>
          </li>
          <li>
            <button
              className="navbar-link"
              onClick={() => handleScrollToSection('blog-post-form-section')}
            >
              Blogs
            </button>
          </li>
          <li>
            <Link to="/trending" className="navbar-link">Trending Blogs</Link>
          </li>
          <li>
            <button className="navbar-link" onClick={handleAddBlogClick}>Add Blog</button>
          </li>
          <li>
            <button
              className="navbar-link"
              onClick={() => handleScrollToSection('contact-us-section')}
            >
              Contact us
            </button>
          </li>
          {user && (
            <li>
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            </li>
          )}
        </ul>
        <div className="navbar-auth">
          <li>
            {user ? (
              <button className="navbar-link signup-btn" onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login" className="navbar-link signup-btn">Login</Link>
            )}
          </li>
          <li>
            <Link to="/signup" className="navbar-link signup-btn">Signup</Link>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
