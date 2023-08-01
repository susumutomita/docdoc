/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';

import { createPost } from '../../../src/app/services/posts/postsService';

import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('createPost', () => {
  it('creates a new post when title and content are given', async () => {
    const post = await createPost('My First Post', 'This is my first post.');

    expect(post).toEqual({
      id: '123',
      title: 'My First Post',
      content: 'This is my first post.',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('throws an error when no title is given', async () => {
    expect.assertions(2);

    try {
      await createPost('', 'This is a post without a title.');
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
    expect.assertions(2);

    try {
      await createPost('Title without content', '');
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
