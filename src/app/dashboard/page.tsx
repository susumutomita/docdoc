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
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">ダッシュボード</h1>
          <button className="btn-primary">新しいメモを作成</button>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/4">
            <div className="card">
              <h2 className="card-header">更新されたメモ</h2>
              <ul>
                {posts.map(post => (
                  <li
                    key={post.id}
                    className="border-b border-gray-700 last:border-b-0 py-2 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-bold">{post.title}</h3>
                      <p className="card-body">
                        {post.category} - {post.author.name}
                      </p>
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(post.createdAt).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <div className="card">
              <h2 className="card-header">最近見たメモ</h2>
              <p className="card-body">現在見ているメモはありません。</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/users" className="btn-secondary mr-4">
            ユーザーを作成
          </Link>
          <Link href="/api-docs" className="btn-secondary">
            APIドキュメント
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
