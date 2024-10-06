import { HashRouter as Router, Routes, Route } from 'react-router-dom';  // Correct import
// import 'bootstrap/dist/css/bootstrap.min.css';


import About from './components/About';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import SignupForm from "./components/SignupForm";
import BlogPostForm from './components/BlogPostForm';
import HomePage from './components/HomePage';  // Import the new HomePage component
import LoginPage from './components/LoginPage';

import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './store/AuthContext'; // Adjust path as necessary


import './App.css';







function App() {


  return (


    <AuthProvider>

      <Router>
        <div>
          <NavBar /> {/* This will be present on every page */}
          <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/add-blog" element={<BlogPostForm />} />

            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Footer /> {/* Footer will also be present on every page */}
        </div>
      </Router>
    </AuthProvider>

  );
}

export default App;
