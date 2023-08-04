// postsRepository.test.ts
import { getDataFromFirebase } from '../../../src/app/posts/postsRepository';
import { getFirestore, getDocs, collection } from 'firebase/firestore';

jest.mock('firebase/firestore', () => {
  return {
    getFirestore: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(),
  };
});

describe('postsRepository', () => {
  describe('getDataFromFirebase', () => {
    it('should return data from Firebase', async () => {
      // テスト用に仮のデータを用意
      const mockData = [
        { id: '1', title: 'Post 1', content: 'This is the first post.' },
        { id: '2', title: 'Post 2', content: 'This is the second post.' },
      ];

      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockData.map(data => ({
          data: () => data,
        })),
      });

      const data = await getDataFromFirebase('posts');
      expect(data).toEqual(mockData);
    });
  });
});
