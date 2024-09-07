// src/components/login/Login.js

import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';



const getCookies = () => {
  const cookies = document.cookie.split('; ');
  const cookieObject = {};
  cookies.forEach((cookie) => {
    const [name, value] = cookie.split('=');
    cookieObject[name] = decodeURIComponent(value);
  });
  return cookieObject;
};


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
useEffect(()=>{
  if(getCookies().access_token){
    navigate('/dashboard')
  }
},[navigate])


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };
  


  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {

    
    e.preventDefault();
    try {
     
      const production = 'https://backend-zeta-two-76.vercel.app/login';
      const local = 'http://localhost:3000/login'
      const response =  axios.post(production, formData,{ withCredentials: true });
      console.log('Login successful:', response.data);
      localStorage.setItem('access_token', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button
          type="button"
          className="create-account-button"
          onClick={() => navigate('/')}
        >
          Create an Account
        </button>
      </form>
    </div>
  );
}

export default Login;
