
import './loginPanel.css'
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setisLogin }) {
  const usernameRef = useRef(null); 
  const passwordRef = useRef(null); 
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log("Username:", usernameRef.current.value); 
    console.log("Password:", passwordRef.current.value); 
    setisLogin(true); 
    navigate('/');  
  };

  return (
    <>
    <div className = "loginPanel">
      <h2>Login Page</h2>
      <input 
        ref={usernameRef} 
        type="text" 
        placeholder="Username" 
      />
      <input 
        ref={passwordRef} 
        type="password" 
        placeholder="Password" 
      />
      <button onClick={handleLoginClick}>Login</button>
      </div>
    </>
    
  );
}

export default Login;
