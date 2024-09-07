import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: '', email: '' }); // State to hold user data

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const production = 'https://backend-zeta-two-76.vercel.app/validate-token';
        const local = 'http://localhost:3000/validate-token';
        const response = await axios.get(production, {
          headers: { 'Authorization': `Bearer ${token}` },
          withCredentials: true
        });

        console.log('dashboard data', response.data);
        setUserData(response.data.data);
      } catch (err) {
        console.log("error in UI in dashboard", err.message);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.post('https://backend-zeta-two-76.vercel.app/logout', {}, {
        headers: { 'Authorization': `Bearer ${token}` },
        withCredentials: true
      });
      console.log('User logged out');
      localStorage.removeItem('access_token');
      navigate('/login');
    } catch (error) {
      console.log('Error in logout', error.message);
    }
  };

  const handleGetUsers = () => {
    console.log('Get Users');
  };

  const handleGetProfile = () => {
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
        <h2>Welcome , {userData.name}!</h2>
      </div>
    </div>
  );
}

export default Dashboard;
