import Link from 'next/link';
import { Post } from '../app/posts/PostsType';

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  const createMarkup = () => {
    return { __html: post.content };
  };

  return (
    <div>
      <h2>
        <Link href={`/posts/${post.id}`}>
          <a>{post.title}</a>
        </Link>
      </h2>
      <p dangerouslySetInnerHTML={createMarkup()}></p>
    </div>
  );
};

export default PostItem;
