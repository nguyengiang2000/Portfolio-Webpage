import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/nav';
import Home from './components/home';
import About from './components/about';
import Login from './components/login';
import Signup from './components/signup';
import Help from './components/help';
import NewPost from './components/newPost';
import { getDatabase, ref, push, set} from "firebase/database";
import app from "./firebase";

function App() {
  const [isLogin, setisLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  return (
    <Router>
      <Nav isLogin={isLogin} setisLogin={setisLogin} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setisLogin={setisLogin} setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={ <Signup setisLogin={setisLogin} setCurrentUser={setCurrentUser} />}/>
        <Route path="/help" element={<Help/>}/>
        <Route   path="/newpost" 
          element={isLogin ? <NewPost currentUser={currentUser}/> : <Navigate to="/login" />}/>
      </Routes>
    </Router>
  );
}

export default App;
