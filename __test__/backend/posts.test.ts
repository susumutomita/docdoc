import { PrismaClient } from '@prisma/client';
import { POST as POST_USER } from '../../src/app/api/users/route';
import { POST, GET } from '../../src/app/api/posts/route';
import { GET as GET_ID, PUT, DELETE } from '../../src/app/api/posts/[id]/route';

const prisma = new PrismaClient();

describe('Posts API', () => {
  let userId: number;

  beforeEach(async () => {
    const requestBody = JSON.stringify({
      email: `testuser-${Date.now()}@example.com`,
      name: 'Test User',
    });
    const request = new Request('http://localhost:3000/api/users', {
      method: 'POST',
      body: requestBody,
    });

    const response = await POST_USER(request);
    const user = await response.json();
    userId = user.id;
  });

  afterEach(async () => {
    await prisma.$transaction([
      prisma.postTag.deleteMany(),
      prisma.tag.deleteMany(),
      prisma.post.deleteMany(),
      prisma.user.deleteMany(),
    ]);
  });

  it('should create a post and return 201 status', async () => {
    const requestBody = JSON.stringify({
      title: 'Test Post',
      body: 'This is a test post.',
      tags: ['test', 'example'],
      author_id: userId,
    });
    const request = new Request('http://localhost:3000/api/posts', {
      method: 'POST',
      body: requestBody,
    });

    const response = await POST(request);

    expect(response.status).toBe(201);
    const post = await response.json();
    expect(post).toHaveProperty('title', 'Test Post');
    expect(post).toHaveProperty('body', 'This is a test post.');
  });

  it('should retrieve all posts and return 200 status', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
  });

  it('should retrieve a specific post by ID and return 200 status', async () => {
    const requestBody = JSON.stringify({
      title: 'Specific Post',
      body: 'This is a specific post.',
      tags: ['specific'],
      author_id: userId,
    });
    const createRequest = new Request('http://localhost:3000/api/posts', {
      method: 'POST',
      body: requestBody,
    });

    const createResponse = await POST(createRequest);
    const createdPost = await createResponse.json();

    const response = await GET_ID(
      new Request(`http://localhost:3000/api/posts/${createdPost.id}`),
      { params: { id: createdPost.id.toString() } },
    );

    expect(response.status).toBe(200);
    const post = await response.json();
    expect(post).toHaveProperty('title', 'Specific Post');
    expect(post).toHaveProperty('body', 'This is a specific post.');
  });

  it('should update a post and return 200 status', async () => {
    const requestBody = JSON.stringify({
      title: 'Update Post',
      body: 'This post will be updated.',
      tags: ['update'],
      author_id: userId,
    });
    const createRequest = new Request('http://localhost:3000/api/posts', {
      method: 'POST',
      body: requestBody,
    });

    const createResponse = await POST(createRequest);
    const createdPost = await createResponse.json();

    const updateRequestBody = JSON.stringify({
      title: 'Updated Post',
      body: 'This post has been updated.',
      tags: ['updated'],
    });
    const updateRequest = new Request(
      `http://localhost:3000/api/posts/${createdPost.id}`,
      {
        method: 'PUT',
        body: updateRequestBody,
      },
    );

    const updateResponse = await PUT(updateRequest, {
      params: { id: createdPost.id.toString() },
    });

    expect(updateResponse.status).toBe(200);
    const updatedPost = await updateResponse.json();
    expect(updatedPost).toHaveProperty('title', 'Updated Post');
    expect(updatedPost).toHaveProperty('body', 'This post has been updated.');
  });

  it('should delete a post and return 204 status', async () => {
    const requestBody = JSON.stringify({
      title: 'Delete Post',
      body: 'This post will be deleted.',
      tags: ['delete'],
      author_id: userId,
    });
    const createRequest = new Request('http://localhost:3000/api/posts', {
      method: 'POST',
      body: requestBody,
    });

    const createResponse = await POST(createRequest);
    const createdPost = await createResponse.json();

    const deleteRequest = new Request(
      `http://localhost:3000/api/posts/${createdPost.id}`,
      {
        method: 'DELETE',
      },
    );

    const deleteResponse = await DELETE(deleteRequest, {
      params: { id: createdPost.id.toString() },
    });

    expect(deleteResponse.status).toBe(204);
  });

  it('should return 404 when trying to update a non-existent post', async () => {
    const updateRequestBody = JSON.stringify({
      title: 'Non-existent Post',
      body: 'This post does not exist.',
      tags: ['nonexistent'],
    });
    const updateRequest = new Request(
      `http://localhost:3000/api/posts/999999`,
      {
        method: 'PUT',
        body: updateRequestBody,
      },
    );

    const updateResponse = await PUT(updateRequest, {
      params: { id: '999999' },
    });

    expect(updateResponse.status).toBe(404);
  });

  it('should return 404 when trying to delete a non-existent post', async () => {
    const deleteRequest = new Request(
      `http://localhost:3000/api/posts/999999`,
      {
        method: 'DELETE',
      },
    );

    const deleteResponse = await DELETE(deleteRequest, {
      params: { id: '999999' },
    });

    expect(deleteResponse.status).toBe(404);
  });
});
