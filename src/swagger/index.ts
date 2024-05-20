import usersSwagger from './users';
import postsSwagger from './posts';

const swaggerJson = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
  },
  paths: {
    ...usersSwagger.paths,
    ...postsSwagger.paths,
  },
};

export default swaggerJson;
