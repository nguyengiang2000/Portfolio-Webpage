import './signup.css';
import React, { useRef } from 'react';
import { getDatabase, ref, push, set } from "firebase/database"; 
import app from "../firebase";
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';

function signup({ setisLogin, setCurrentUser }) {
  const usernameRef = useRef(null); 
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);
  const authorRef = useRef(null); 
  const emailRef = useRef(null); 
  const navigate = useNavigate();

  const handleSignupClick = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const password2 = password2Ref.current.value;
    const email = emailRef.current.value;
    const author = authorRef.current.value;

    if (password !== password2) {
      alert("Passwords do not match. Please re-enter.");
      return;
    }

    const db = getDatabase(app);
    const newUserRef = push(ref(db, "users"));
    const hashedPassword = md5(password);

    try {
      await set(newUserRef, {
        username: username,
        password: hashedPassword,
        author: author,
        email: email
      });
      alert("Account successfully created!");
      setisLogin(true);
      setCurrentUser(author);
      navigate('/'); 
    } catch (error) {
      alert("Error: " + error.message);
      navigate('/signup'); 
    }

    authorRef.current.value = "";
    emailRef.current.value = "";
    usernameRef.current.value = "";
    passwordRef.current.value = "";
    password2Ref.current.value = "";
  };

  return (
    <>
      <div className="signupDiv">
        <h2>Sign Up Form</h2>
        <form onSubmit={handleSignupClick}>
          <input 
            ref={authorRef} 
            type="text" 
            placeholder="Author" 
            required
          />
          <input 
            ref={emailRef} 
            type="email" 
            placeholder="Email" 
            required
          />
          <input 
            ref={usernameRef} 
            type="text" 
            placeholder="Username" 
            required
          />
          <input 
            ref={passwordRef} 
            type="password" 
            placeholder="Password" 
            required
          />
          <input 
            ref={password2Ref} 
            type="password" 
            placeholder="Retype Password" 
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default signup;
