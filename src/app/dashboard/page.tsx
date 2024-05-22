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
          <h1 className="text-2xl font-bold">ダッシュボード</h1>
          <button className="btn btn-primary">新しいメモを作成</button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/4">
            <div className="bg-white p-4 rounded-lg shadow-md mb-8">
              <h2 className="text-lg font-bold">更新されたメモ</h2>
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
          <div className="w-full md:w-1/4 md:pl-4">
            <div className="bg-white p-4 rounded-lg shadow-md mb-8">
              <h2 className="text-lg font-bold">最近見たメモ</h2>
              <p>現在見ているメモはありません。</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/users" className="btn btn-secondary mr-4">
            ユーザーを作成
          </Link>
          <Link href="/api-docs" className="btn btn-secondary">
            APIドキュメント
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
