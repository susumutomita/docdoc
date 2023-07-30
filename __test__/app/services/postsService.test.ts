/**
* @jest-environment jsdom　　　　
*/
import '@testing-library/jest-dom/extend-expect'

import { createPost } from '../../../src/app/services/posts/postsService';


import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('createPost', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('creates a new post when title and content are given', async () => {
    // モックのレスポンスをセットする
    fetchMock.mockResponseOnce(JSON.stringify({
      id: '123',
      title: 'My First Post',
      content: 'This is my first post.',
      createdAt: '2023-07-23T12:34:56Z',
      updatedAt: '2023-07-23T12:34:56Z',
    }));

    const post = await createPost('My First Post', 'This is my first post.');

    // fetchが正しいURLとオプションで呼び出されたことを確認する
    expect(fetchMock.mock.calls[0][0]).toEqual('/api/posts');
    expect(fetchMock.mock.calls[0][1]).toEqual({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'My First Post', content: 'This is my first post.' }),
    });

    // 返されたデータが正しいことを確認する
    expect(post).toEqual({
      id: '123',
      title: 'My First Post',
      content: 'This is my first post.',
      createdAt: new Date('2023-07-23T12:34:56Z'),
      updatedAt: new Date('2023-07-23T12:34:56Z'),
    });
  });


  it('throws an error when no title is given', async () => {
    expect.assertions(2);

    try {
      await createPost('', 'This is a post without a title.');
    } catch (err) {
      if (err instanceof Error) { // check if err is an Error object
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
      if (err instanceof Error) { // check if err is an Error object
        expect(err.message).toEqual('Content is required.');
      }
    }

    // fetchが呼び出されないことを確認する
    expect(fetchMock.mock.calls.length).toEqual(0);
  });


});
