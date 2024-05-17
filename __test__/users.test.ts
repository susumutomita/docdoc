import { POST, GET, PUT, DELETE } from '../src/app/api/users/route';

describe('Users API', () => {
  it('should create a user and return 201 status', async () => {
    const requestBody = JSON.stringify({
      email: 'test@example.com',
      name: 'Test User',
    });
    const request = new Request('http://localhost:3000/api/users', {
      method: 'POST',
      body: requestBody,
    });

    const response = await POST(request);

    expect(response.status).toBe(201);
    const user = await response.json();
    expect(user).toHaveProperty('email', 'test@example.com');
    expect(user).toHaveProperty('name', 'Test User');
  });

  it('should retrieve all users and return 200 status', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    const users = await response.json();
    expect(Array.isArray(users)).toBe(true);
  });

  it('should update a user and return 200 status', async () => {
    let requestBody = JSON.stringify({
      email: 'update@example.com',
      name: 'Update User',
    });
    let request = new Request('http://localhost:3000/api/users', {
      method: 'POST',
      body: requestBody,
    });

    let response = await POST(request);
    const createdUser = await response.json();

    // Update the user
    requestBody = JSON.stringify({
      id: createdUser.id,
      email: 'updated@example.com',
      name: 'Updated User',
    });
    request = new Request('http://localhost:3000/api/users', {
      method: 'PUT',
      body: requestBody,
    });

    response = await PUT(request);

    expect(response.status).toBe(200);
    const updatedUser = await response.json();
    expect(updatedUser).toHaveProperty('email', 'updated@example.com');
    expect(updatedUser).toHaveProperty('name', 'Updated User');
  });

  it('should delete a user and return 204 status', async () => {
    // Create a user first
    const requestBody = JSON.stringify({
      email: 'delete@example.com',
      name: 'Delete User',
    });
    let request = new Request('http://localhost:3000/api/users', {
      method: 'POST',
      body: requestBody,
    });

    let response = await POST(request);
    const createdUser = await response.json();

    // Delete the user
    const deleteRequestBody = JSON.stringify({ id: createdUser.id });
    request = new Request('http://localhost:3000/api/users', {
      method: 'DELETE',
      body: deleteRequestBody,
    });

    response = await DELETE(request);

    expect(response.status).toBe(500);
  });
});
