import { Post } from './PostsType';
import { PostsRepository } from './PostsRepository';

export class PostsService {
  private PostsRepository: PostsRepository;

  constructor() {
    this.PostsRepository = new PostsRepository();
  }

  async createPost(title: string, content: string): Promise<Post> {
    if (!title) {
      throw new Error('A title is required.');
    }

    if (!content) {
      throw new Error('Content is required.');
    }

    // Firebase などの API を呼び出し、新しい投稿を作成します。
    // この部分は具体的な実装によります。

    // 新しい投稿のデータを返します。
    return {
      id: '123', // 実際には API から得たデータを使用します
      title: title,
      content: content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.PostsRepository.getDataFromFirebase('posts');
    return posts as Post[];
  }
}
