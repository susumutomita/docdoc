import { Post } from './PostsType';
import { PostsRepository } from './PostsRepository';

export class PostsService {
  private postsRepository: PostsRepository;

  constructor() {
    this.postsRepository = new PostsRepository();
  }

  async createPost(title: string, content: string): Promise<Post> {
    if (!title) {
      throw new Error('A title is required.');
    }

    if (!content) {
      throw new Error('Content is required.');
    }

    const post = {
      title: title,
      content: content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newPost = await this.postsRepository.createDataInFirebase(
      'posts',
      post,
    );

    return {
      id: newPost.id,
      title: newPost.title,
      content: newPost.content,
      createdAt: newPost.createdAt.toDate(),
      updatedAt: newPost.updatedAt.toDate(),
    };
  }
}
