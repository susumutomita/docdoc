// postsRepository.test.ts
import { PostsRepository } from '../../../src/app/posts/PostsRepository';
import { getDocs } from 'firebase/firestore';

jest.mock('firebase/firestore', () => {
  return {
    getFirestore: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(),
  };
});
let postsRepository: PostsRepository;

beforeEach(() => {
  postsRepository = new PostsRepository();
});

describe('postsRepository', () => {
  describe('getDataFromFirebase', () => {
    it('should return data from Firebase', async () => {
      // Prepare mock data for testing
      const mockData = [
        {
          id: '1',
          title: 'Post 1',
          content: 'This is the first post.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Post 2',
          content: 'This is the second post.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockData.map(data => ({
          data: () => data,
        })),
      });

      const data = await postsRepository.getDataFromFirebase('posts');
      expect(data).toEqual(mockData);
    });
  });
});
