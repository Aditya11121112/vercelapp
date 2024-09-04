import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
 
  axios.defaults.withCredentials = true;
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // You can replace the URL with your registration API endpoint
      const response = await axios.post('https://backend-zeta-two-76.vercel.app/register', formData);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
        <button type="submit">Register</button>
        <button
          type="button"
          className="login-button"
          onClick={() => navigate('/login')}
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
}

export default Register;
