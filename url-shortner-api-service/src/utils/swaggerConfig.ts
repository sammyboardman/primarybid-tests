import swaggerJsdoc from "swagger-jsdoc";
import config from "./config";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Express.js application.',
    },
    servers: [
      {
        url: config.serverUrl,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export default swaggerJsdoc(options);

