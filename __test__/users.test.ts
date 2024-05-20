import { POST, GET } from '../src/app/api/users/route';
import { GET as GET_ID, PUT, DELETE } from '../src/app/api/users/[id]/route';

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

  it('should retrieve a specific user by ID and return 200 status', async () => {
    const requestBody = JSON.stringify({
      email: 'specific@example.com',
      name: 'Specific User',
    });
    const createRequest = new Request('http://localhost:3000/api/users', {
      method: 'POST',
      body: requestBody,
    });

    const createResponse = await POST(createRequest);
    const createdUser = await createResponse.json();
    console.debug(createdUser);
    console.debug(createdUser.id);

    const response = await GET_ID(
      new Request(`http://localhost:3000/api/users/${createdUser.id}`),
      { params: { id: createdUser.id.toString() } },
    );

    expect(response.status).toBe(200);
    const user = await response.json();
    expect(user).toHaveProperty('email', 'specific@example.com');
    expect(user).toHaveProperty('name', 'Specific User');
  });

  it('should update a user and return 200 status', async () => {
    const requestBody = JSON.stringify({
      email: 'update@example.com',
      name: 'Update User',
    });
    const createRequest = new Request('http://localhost:3000/api/users', {
      method: 'POST',
      body: requestBody,
    });

    const createResponse = await POST(createRequest);
    const createdUser = await createResponse.json();

    const updateRequestBody = JSON.stringify({
      email: 'updated@example.com',
      name: 'Updated User',
    });
    const updateRequest = new Request(
      `http://localhost:3000/api/users/${createdUser.id}`,
      {
        method: 'PUT',
        body: updateRequestBody,
      },
    );

    const updateResponse = await PUT(updateRequest, {
      params: { id: createdUser.id.toString() },
    });

    expect(updateResponse.status).toBe(200);
    const updatedUser = await updateResponse.json();
    expect(updatedUser).toHaveProperty('email', 'updated@example.com');
    expect(updatedUser).toHaveProperty('name', 'Updated User');
  });

  it('should delete a user and return 204 status', async () => {
    const requestBody = JSON.stringify({
      email: 'delete@example.com',
      name: 'Delete User',
    });
    const createRequest = new Request('http://localhost:3000/api/users', {
      method: 'POST',
      body: requestBody,
    });

    const createResponse = await POST(createRequest);
    const createdUser = await createResponse.json();

    const deleteRequest = new Request(
      `http://localhost:3000/api/users/${createdUser.id}`,
      {
        method: 'DELETE',
      },
    );

    const deleteResponse = await DELETE(deleteRequest, {
      params: { id: createdUser.id.toString() },
    });

    expect(deleteResponse.status).toBe(204);
  });
});
