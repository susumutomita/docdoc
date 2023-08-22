import { useState } from 'react';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });

      if (response.ok) {
        alert('投稿が成功しました！');
      } else {
        alert('投稿に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      console.error(error);
      alert('投稿に失敗しました。');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">タイトル</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="body">本文</label>
        <textarea
          id="body"
          value={body}
          onChange={event => setBody(event.target.value)}
        />
      </div>
      <button type="submit">投稿する</button>
    </form>
  );
};

export default PostForm;
