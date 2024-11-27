import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

  return (
    <Router>
      <Nav isLogin={isLogin} setisLogin={setisLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setisLogin={setisLogin} />} />
        <Route path="/signup" element={ <Signup />}/>
        <Route path="/help" element={<Help/>}/>
        <Route path="/newpost" element={ <NewPost/>}/>
      </Routes>
    </Router>
  );
}

export default App;
