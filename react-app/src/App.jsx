import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/nav';
import Home from './components/home';
import About from './components/about';
import Login from './components/login';
import Signup from './components/signup';
import Help from './components/help';
import NewPost from './components/newPost';
import { getDatabase, ref, push, set } from "firebase/database";
import app from "./firebase";

function App() {

  // Store user and status of login
  const storedLoginState = localStorage.getItem('isLogin') === 'true';
  const storedUser = localStorage.getItem('currentUser');

  // set isLogin and CurrentUser with LocalStorage
  const [isLogin, setIsLogin] = useState(storedLoginState); 
  const [currentUser, setCurrentUser] = useState(storedUser || "");

  // Logout function: clears localStorage and resets the state
  const handleLogout = () => {
    setIsLogin(false);
    setCurrentUser("");
    localStorage.removeItem('isLogin');
    localStorage.removeItem('currentUser');
  };

  return (
    <Router>
      <Nav 
        isLogin={isLogin} 
        setIsLogin={setIsLogin} 
        setCurrentUser={setCurrentUser} 
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/about" element={<About />} />
        <Route 
          path="/login" 
          element={<Login setIsLogin={setIsLogin} setCurrentUser={setCurrentUser} />} 
        />
        <Route 
          path="/signup" 
          element={<Signup setIsLogin={setIsLogin} setCurrentUser={setCurrentUser} />} 
        />
        <Route path="/help" element={<Help />} />
        <Route 
          path="/newpost" 
          element={isLogin ? <NewPost currentUser={currentUser} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
