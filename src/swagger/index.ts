import usersSwagger from './users';

const swaggerJson = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
  },
  paths: {
    ...usersSwagger.paths,
  },
};

export default swaggerJson;
