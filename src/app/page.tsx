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
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Create a New Post</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="input input-bordered w-full"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 font-bold mb-2"
          >
            Content:
          </label>
          <textarea
            id="content"
            className="textarea textarea-bordered w-full"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <div className="text-center mt-8">
        <Link href="/users" className="btn btn-secondary mr-4">
          Create User
        </Link>
        <Link href="/api-docs" className="btn btn-secondary">
          API Documentation
        </Link>
      </div>
    </div>
  );
};

export default Home;
