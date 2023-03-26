import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const URL = `http://localhost:8000/flashcard/login`;
      const response = await axios.post(URL, { username, password });
      if (response.status=200) {
        navigate('/flashcards');
      } else {
        setErrorMessage('Incorrect details, please try again');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred, please try again');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <span className="navbar-brand">Social Flashcards</span>
      </nav>
      <div className="login-form">
        <h2>Login</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;