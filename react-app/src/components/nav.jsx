import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './nav.css';

function nav({ isLogin, handleLogout }) {
  const navigate = useNavigate();

  const handleAddPost = () => {
    navigate('/newpost');
  };

  // after login, show Create New Post butotn and Logout
  // before login, show Login and Sign Up button
  // Home, About, Help would alwasy be shown
  return (
    <div className="divBar">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {isLogin ? (
          <>
            <button onClick={handleAddPost} className="navButton">Create New Post</button>
            <button onClick={handleLogout} className="navButton">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
        <Link to="/help">Help</Link>
      </nav>
    </div>
  );
}

export default nav;
