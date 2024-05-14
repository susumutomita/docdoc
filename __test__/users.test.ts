import { GET } from '../src/app/api/health/route';

describe('Health Check API', () => {
  it('should return a 200 status with a message', async () => {
    process.env.TEST_ERROR = 'false';
    const response = await GET();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ message: "'It works!'" });
  });

  it('should handle errors gracefully', async () => {
    process.env.TEST_ERROR = 'true';
    const response = await GET();
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: 'An error occurred while health check.',
    });
    process.env.TEST_ERROR = 'false';
  });
});
