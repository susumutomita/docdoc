/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { PostsService } from '../../../src/app/posts/PostsService';
import fetchMock from 'jest-fetch-mock';
import { getTestPostData } from './testData';

const testPostData = getTestPostData();

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  getDocs: jest.fn(() => Promise.resolve(/* テストデータ */)),
  setDoc: jest.fn(() => Promise.resolve(/* テストデータ */)),
  doc: jest.fn(() => Promise.resolve(/* テストデータ */)),
  getDoc: jest.fn(() =>
    Promise.resolve({
      data: () => testPostData,
    }),
  ),
}));

fetchMock.enableMocks();
let postsService: PostsService;

beforeAll(() => {
  fetchMock.resetMocks();
  postsService = new PostsService();
});

describe('createPost', () => {
  it('creates a new post when title and content are given', async () => {
    // ...
  });

  it('throws an error when no title is given', async () => {
    try {
      await postsService.createPost('', 'This is a post without a title.');
    } catch (err) {
      if (err instanceof Error) {
        // check if err is an Error object
        expect(err.message).toEqual('A title is required.');
      }
    }

    // fetchが呼び出されないことを確認する
    expect(fetchMock.mock.calls.length).toEqual(0);
  });

  it('throws an error when no content is given', async () => {
    try {
      await postsService.createPost('Title without content', '');
    } catch (err) {
      if (err instanceof Error) {
        // check if err is an Error object
        expect(err.message).toEqual('Content is required.');
      }
    }

    // fetchが呼び出されないことを確認する
    expect(fetchMock.mock.calls.length).toEqual(0);
  });
});
