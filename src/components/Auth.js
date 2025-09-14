import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // --- Styles ---
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
    },
    formContainer: {
      padding: '40px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      width: '360px',
      textAlign: 'center',
    },
    title: {
      marginBottom: '25px',
      color: '#1c1e21',
      fontSize: '2em',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '15px',
      border: '1px solid #dddfe2',
      borderRadius: '6px',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '12px',
      border: 'none',
      borderRadius: '6px',
      backgroundColor: '#1877f2',
      color: 'white',
      fontSize: '1.1em',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    error: {
      color: '#fa383e',
      marginBottom: '15px',
    },
    switchButton: {
      marginTop: '20px',
      background: 'none',
      border: 'none',
      color: '#1877f2',
      cursor: 'pointer',
      fontSize: '0.9em',
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Using an environment variable is the best practice for the API URL
    const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    
    const url = isLogin
      ? `${backendUrl}/api/auth/login`
      : `${backendUrl}/api/auth/register`;
      
    try {
      const response = await axios.post(url, { email, password });
      localStorage.setItem('token', response.data.token);
      window.location = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>{isLogin ? 'Log In' : 'Create Account'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>{isLogin ? 'Log In' : 'Register'}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} style={styles.switchButton}>
          {isLogin ? "Need an account? Register" : "Already have an account? Log In"}
        </button>
      </div>
    </div>
  );
};

export default Auth;