import React, { useState } from 'react';
import { getDatabase, ref, push, set } from "firebase/database"; 
import app from "../firebase";
import './newPost.css';

function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const addNewPost = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const db = getDatabase(app);
    const newDocRef = push(ref(db, "posts"));
    setDate(new Date().toISOString().slice(0, 10));

    try {
      await set(newDocRef, {
        title: title,
        content: content,
        date: date
      });
      alert("Post successfully created!");
    } catch (error) {
      alert("Error: " + error.message);
    }
    setTitle("");
    setContent("");
  };

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
