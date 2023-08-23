import { useState, useEffect } from 'react';
import PostItem from './PostItem';
import { Post } from '../app/posts/PostsType';

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>投稿一覧</h1>
      {posts.length > 0 ? (
        posts.map(post => <PostItem key={post.id} post={post} />)
      ) : (
        <p>投稿がありません。</p>
      )}
    </div>
  );
};

export default PostList;
