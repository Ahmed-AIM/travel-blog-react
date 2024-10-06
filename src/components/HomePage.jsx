import React from 'react';
import About from './About';
import Blog from './Blog';
import ContactUs from './ContactUs';

const HomePage = () => {
  return (
    <div>
      <section id="about-section">
        <About />
      </section>

      <section id="blog-post-form-section">
        <Blog />
      </section>

      <section id="contact-us-section">
        <ContactUs />
      </section>
    </div>
  );
};

export default HomePage;
