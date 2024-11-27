import './loginPanel.css';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, get } from "firebase/database";
import { auth, githubProvider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";  
import PropTypes from 'prop-types';
import md5 from 'md5';

// setIsLogin and setCurrentUser as params
function login({ setIsLogin, setCurrentUser }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    // connect to firebase
    const db = getDatabase();
    const userRef = ref(db, 'users');
    const snapshot = await get(userRef);

    // compare child users
    let userFound = false;
    snapshot.forEach((childSnapshot) => {
      const user = childSnapshot.val();
      const hashedPassword = md5(password);
      // if username match and password after hashed match hashed password in database, login succesffully
      if (user.username === username && user.password === hashedPassword) {
        userFound = true;
        setIsLogin(true);
        setCurrentUser(user.author);

        // then set localStorage for isLogin and currentUser
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('currentUser', user.author);

        // then pop up messgae and navigate to Home Page
        alert("Login successful!");
        navigate('/');
        return;
      }
    });

    // alert if password or username wrong
    if (!userFound) {
      alert("Invalid username or password.");
    }

    // clear textbox
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  // Login in with Github Provider
  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      setIsLogin(true);
      setCurrentUser(user.displayName || user.email);

      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('currentUser', user.displayName || user.email);

      alert("Login successful with GitHub!");
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("GitHub login failed.");
    }
  };

  // Login Form
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
        <button type="submit">Login with Forum Account</button>
      </form>
      <button className="github" onClick={handleGithubLogin}>
        Login with GitHub
      </button>
    </div>
  );
}

// propTypes check for login
login.propTypes = {
  setIsLogin: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};

export default login;
