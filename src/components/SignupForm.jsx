import React, { useState } from 'react';
import '../styles/SignupForm.css';

const SignupForm = () => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    day: '',
    month: '',
    year: '',
    gender: '',
    photo: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Load data from localStorage
  const loadData = () => {
    const existingData = localStorage.getItem('formData');
    return existingData ? JSON.parse(existingData) : [];
  };

  const [userData, setUserData] = useState(loadData());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
      setFormData({
        ...formData,
        photo: file.name // Store the file name (you can handle actual file uploading later)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the new user data to the current array
    const updatedUserData = [...userData, formData];
    setUserData(updatedUserData);

    // Store data back in localStorage
    localStorage.setItem('formData', JSON.stringify(updatedUserData));

    // Reset the form
    setFormData(initialFormData);
    setProfilePhoto(null);

    alert('User data saved successfully!');
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <div className="dob-selectors">
            <select name="day" value={formData.day} onChange={handleChange} required>
              <option value="">Day</option>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>

            <select name="month" value={formData.month} onChange={handleChange} required>
              <option value="">Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>

            <select name="year" value={formData.year} onChange={handleChange} required>
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Profile Photo</label>
          <input type="file" onChange={handlePhotoUpload} required />
          {profilePhoto && <img src={profilePhoto} alt="Profile Preview" className="profile-preview" />}
        </div>

        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
