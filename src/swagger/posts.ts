const postsSwagger = {
  paths: {
    '/api/posts': {
      get: {
        tags: ['Posts'],
        summary: 'Retrieve all posts',
        responses: {
          200: {
            description: 'A list of posts',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                      title: { type: 'string' },
                      body: { type: 'string' },
                      draft: { type: 'boolean' },
                      notice: { type: 'boolean' },
                      scope: { type: 'string' },
                      publishedAt: { type: 'string', format: 'date-time' },
                      authorId: { type: 'integer' },
                      tags: {
                        type: 'array',
                        items: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Posts'],
        summary: 'Create a new post',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  body: { type: 'string' },
                  draft: { type: 'boolean' },
                  notice: { type: 'boolean' },
                  scope: { type: 'string' },
                  publishedAt: { type: 'string', format: 'date-time' },
                  authorId: { type: 'integer' },
                  tags: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                },
                required: ['title', 'authorId'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Post created successfully',
          },
        },
      },
    },
    '/api/posts/{id}': {
      get: {
        tags: ['Posts'],
        summary: 'Retrieve a post by ID',
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
          201: {
            description: 'A post object',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    body: { type: 'string' },
                    authorId: { type: 'integer' },
                    tags: {
                      type: 'array',
                      items: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: 'Post not found',
          },
        },
      },
      put: {
        tags: ['Posts'],
        summary: 'Update a post by ID',
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
                  title: { type: 'string' },
                  body: { type: 'string' },
                  draft: { type: 'boolean' },
                  notice: { type: 'boolean' },
                  scope: { type: 'string' },
                  publishedAt: { type: 'string', format: 'date-time' },
                  tags: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                },
                required: ['title'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Post updated successfully',
          },
          404: {
            description: 'Post not found',
          },
        },
      },
      delete: {
        tags: ['Posts'],
        summary: 'Delete a post by ID',
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
            description: 'Post deleted successfully',
          },
          404: {
            description: 'Post not found',
          },
        },
      },
    },
  },
};

export default postsSwagger;
