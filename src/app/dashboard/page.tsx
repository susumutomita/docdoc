'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

interface Post {
  id: number;
  title: string;
  category: string;
  author: { name: string };
  createdAt: string;
}

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link
            href="/posts/create"
            className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
          >
            Create New Post
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">Recent Posts</h2>
              <ul>
                {posts.map(post => (
                  <li
                    key={post.id}
                    className="border-b last:border-b-0 py-2 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-bold">{post.title}</h3>
                      <p className="text-sm text-gray-500">
                        {post.category} - {post.author.name}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold">Recently Viewed Posts</h2>
              <p>No posts viewed recently.</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link
            href="/users"
            className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
          >
            Create User
          </Link>
          <Link
            href="/api-docs"
            className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
          >
            API Docs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
