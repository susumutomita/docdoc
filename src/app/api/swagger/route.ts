import { NextResponse } from 'next/server';

const swaggerJson = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
  },
  paths: {
    '/api/users': {
      get: {
        summary: 'Retrieve all users',
        responses: {
          200: {
            description: 'A list of users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      email: { type: 'string' },
                      name: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  name: { type: 'string' },
                },
                required: ['email', 'name'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User created successfully',
          },
        },
      },
    },
    '/api/users/{id}': {
      get: {
        summary: 'Retrieve a user by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          200: {
            description: 'A user object',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    email: { type: 'string' },
                    name: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        summary: 'Update a user by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  name: { type: 'string' },
                },
                required: ['email', 'name'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'User updated successfully',
          },
        },
      },
      delete: {
        summary: 'Delete a user by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          204: {
            description: 'User deleted successfully',
          },
        },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(swaggerJson);
}
