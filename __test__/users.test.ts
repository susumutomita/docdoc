import { POST, GET } from '../src/app/api/users/route';

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
});
