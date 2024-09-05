// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: '', email: '' }); // State to hold user data

  // Authentication check on dashboard that logged-in user can access
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Make a request to the backend to validate the access token
        const production = 'https://backend-zeta-two-76.vercel.app/validate-token';
        const local = 'https://localhost:3000/validate-token';
        const response = await axios.get(production, { withCredentials: true });
        console.log('Dashboard data:', response.data.data);
        if (response.data.data === '') {
          navigate('/login');
        } else {
          setUserData(response.data.data.name); // Set user data if token is valid
        }
      } catch (error) {
        // If there is an error (e.g., 401 Unauthorized), redirect to the login page
        console.error('User not authenticated:', error.message);
        navigate('/login'); // Redirect to the login page
      }
    };

    checkAuthentication(); // Call the authentication check on component mount
  }, [navigate]);

  const handleLogout = async () => {
    // Implement logout logic here
    await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
    console.log('User logged out');
    navigate('/login');
  };

  const handleGetUsers = () => {
    // Implement get users logic here
    console.log('Get Users');
  };

  const handleGetProfile = () => {
    // Implement get profile logic here
    console.log('Get Profile');
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <button onClick={handleGetUsers}>Get Users</button>
        <button onClick={handleGetProfile}>Get Profile</button>
      </div>
      <div className="header">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="content">
        {/* Dynamic welcome message using the user's name */}
        <h2>Welcome , {userData.name}!</h2>
      </div>
    </div>
  );
}

export default Dashboard;
