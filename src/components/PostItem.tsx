import Link from 'next/link';

const PostItem = ({ post }) => {
  return (
    <div>
      <h2>
        <Link href={`/posts/${post.id}`}>
          <a>{post.title}</a>
        </Link>
      </h2>
      <p>{post.body}</p>
    </div>
  );
};

export default PostItem;
