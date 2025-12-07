'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { NextPage } from 'next';
import Navbar from '../../components/Navbar';

interface User {
  id: number;
  email: string;
  name: string | null;
}

const CreatePost: NextPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [draft, setDraft] = useState(false);
  const [authorId, setAuthorId] = useState<number | ''>('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users');
        setUsers(res.data);
        if (res.data.length > 0) {
          setAuthorId(res.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorId) {
      alert('Please select an author');
      return;
    }

    setLoading(true);
    try {
      const tagArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      await axios.post('/api/posts', {
        title,
        body,
        draft,
        tags: tagArray.length > 0 ? tagArray : undefined,
        author_id: authorId,
      });

      alert('Post created successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="p-2 block w-full border rounded-md bg-white text-black border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter post title"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Author <span className="text-red-500">*</span>
            </label>
            <select
              id="author"
              value={authorId}
              onChange={e => setAuthorId(Number(e.target.value))}
              required
              className="p-2 block w-full border rounded-md bg-white text-black border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select an author</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name || user.email}
                </option>
              ))}
            </select>
            {users.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                No users found.{' '}
                <a href="/users" className="text-indigo-500 hover:underline">
                  Create a user first
                </a>
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <textarea
              id="body"
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={8}
              className="p-2 block w-full border rounded-md bg-white text-black border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Write your post content here..."
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="p-2 block w-full border rounded-md bg-white text-black border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter tags separated by commas (e.g., tech, tutorial, news)"
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={draft}
                onChange={e => setDraft(e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Save as draft</span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
