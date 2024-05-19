'use client';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/posts', {
        title,
        content,
      });
      console.log(response.data);
      alert('Post created!');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
      alert('Failed to create post');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link href="/users">Create User</Link>
      <br />
      <Link href="/api-docs">API Documentation</Link>
    </div>
  );
};

export default Home;
