import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from "firebase/database"; 
import app from "../firebase";
import './newPost.css';

function home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "/posts");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setPosts(Object.values(snapshot.val()));
      } else {
        alert("Error fetching posts");
      }
    };

    fetchData(); 
  }, []); 

  return (
    <>
      <h1>Welcome to The Forum</h1>
      <div className="postCards">
        {posts.map((post, index) => (
          <div key={index} className="postCard">
            <h3>{post.title}</h3>
            <h5>Posted on {post.date}</h5>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default home;
