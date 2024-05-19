// src/app/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js API with Swagger',
      version: '1.0.0',
    },
  },
  apis: ['./src/app/api/**/*.ts'], // SwaggerがAPIをスキャンする場所
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
