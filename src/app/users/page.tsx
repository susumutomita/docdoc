'use client';
import axios from 'axios';
import { useState } from 'react';
import type { NextPage } from 'next';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateUser;
