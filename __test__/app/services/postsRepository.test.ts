// postsRepository.test.ts

import { getDataFromFirebase } from '../../../src/app/services/posts/postsRepository';

describe('postsRepository', () => {
  describe('getDataFromFirebase', () => {
    it('should return data from Firebase', async () => {
      const data = await getDataFromFirebase('posts');

      // テスト用に仮のデータを用意
      const mockData = [
        { id: '1', title: 'Post 1', content: 'This is the first post.' },
        { id: '2', title: 'Post 2', content: 'This is the second post.' },
      ];

      expect(data).toEqual(mockData);
    });
  });
});
