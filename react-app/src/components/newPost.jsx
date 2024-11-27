import React, { useState } from 'react';
import { getDatabase, ref, push, set } from "firebase/database"; 
import app from "../firebase";
import './newPost.css';

function NewPost({ currentUser }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // set the current user as author of their post
  const currentAuthor = currentUser;

  const addNewPost = async (e) => {
    e.preventDefault();

    const db = getDatabase(app);
    const newDocRef = push(ref(db, "posts"));
    // store date for the post
    const currentDate = new Date().toISOString().slice(0, 10);

    try {
      await set(newDocRef, {
        author: currentAuthor,
        title: title,
        content: content,
        date: currentDate
      });
      alert("Post successfully created!");
    } catch (error) {
      alert("Error: " + error.message);
    }
    // clear textbox for Title and Content after postes!
    setTitle("");
    setContent("");
  };

  // Form for Post upload
  return (
    <div className='postDiv'>
      <form onSubmit={addNewPost}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          name='content'
          placeholder='Content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default NewPost;
