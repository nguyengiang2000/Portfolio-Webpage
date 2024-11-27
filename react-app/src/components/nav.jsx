import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './nav.css';

function Nav({ isLogin, setisLogin, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setisLogin(false); 
    setCurrentUser("");
    navigate('/'); 
  };

  const handleAddPost = () =>{
    navigate('/newpost');
  };

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

export default Nav;
