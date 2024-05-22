'use client';
import axios from 'axios';
import { useState } from 'react';
import type { NextPage } from 'next';
import Navbar from '../components/Navbar';

const CreateUser: NextPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', {
        email,
        name,
      });
      console.log(response.data);
      alert('User created!');
      setEmail('');
      setName('');
    } catch (error) {
      console.error(error);
      alert('Failed to create user');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Create User</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md bg-black text-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md bg-black text-white"
            />
          </div>
          <button
            type="submit"
            className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
