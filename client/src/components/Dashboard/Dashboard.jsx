// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getCookies = () => {
  const cookies = document.cookie.split('; ');
  const cookieObject = {};
  cookies.forEach((cookie) => {
    const [name, value] = cookie.split('=');
    cookieObject[name] = decodeURIComponent(value);
  });
  return cookieObject;
};

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: '', email: '' }); // State to hold user data




  useEffect(()=>{
    if(!getCookies().access_token){
      navigate('/login')
    }

    const local = 'http://localhost:3000/validate-token';
   axios.get(local, { withCredentials: true }).then((response)=>{
      
         console.log('dashboad data',response.data);
         setUserData(response.data.data);
     
          }).catch((err)=>{
               console.log("error in ui in dahboard",err.message)
          });
          

  },[navigate])


  

  const handleLogout = async () => {
    // Implement logout logic here
    await axios.post('https://backend-zeta-two-76.vercel.app/logout', {}, { withCredentials: true });
    console.log('User logged out');
    navigate('/login');
  };

  const handleGetUsers = () => {
    // Implement get users logic here
    console.log('Get Users');
  };

  const handleGetProfile = () => {
    // Implement get profile logic hereDashboard
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
