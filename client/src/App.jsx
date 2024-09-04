// src/App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
