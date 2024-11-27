import './loginPanel.css';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, get } from "firebase/database";
import app from "../firebase";
import md5 from 'md5';
import PropTypes from 'prop-types';

function login({ setIsLogin, setCurrentUser }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const hashedPassword = md5(password);

    const db = getDatabase(app);
    const userRef = ref(db, 'users');
    const snapshot = await get(userRef);

    let userFound = false;

    snapshot.forEach((childSnapshot) => {
      const user = childSnapshot.val();
      if (user.username === username && user.password === hashedPassword) {
        userFound = true;
        setIsLogin(true);
        setCurrentUser(user.author);

        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('currentUser', user.author);

        return;
      }
    });

    if (userFound) {
      alert("Login successful!");
      navigate('/'); 
    } else {
      alert("Invalid username or password.");
    }

    // Clear the input fields
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="loginPanel">
      <form onSubmit={handleLoginSubmit}>
        <h2>Login</h2>
        <label>
          Username:
          <input type="text" ref={usernameRef} required />
        </label>
        <label>
          Password:
          <input type="password" ref={passwordRef} required />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

login.propTypes = {
  setIsLogin: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};

export default login;
