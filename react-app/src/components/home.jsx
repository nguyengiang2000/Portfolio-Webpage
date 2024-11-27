import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from "firebase/database"; 
import app from "../firebase";
import './newPost.css';

function home({ currentUser }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "/posts");
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setPosts(Object.values(snapshot.val()));
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Welcome to The Forum {currentUser}</h1>
      <div className="postCards">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="postCard">
              <h3>{post.title}</h3>
              <h5>Posted by {post.author} on {post.date}</h5>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </>
  );
}

export default home;
