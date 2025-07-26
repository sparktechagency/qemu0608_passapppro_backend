import swaggerJSDoc from "swagger-jsdoc";
import * as path from "node:path";
import swaggerUi from "swagger-ui-express";
import {Application} from "express";

export const swagger = swaggerJSDoc({
    definition: {
    openapi: '3.0.0',
    info: {
      title: 'Qemu',
      version: '1.0.0',
      description: 'This is the documentation for Qemu server api',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Change to your server
      },
    ],
  },
  apis: [path.resolve(__dirname, '../gateway/**/*.ts')]
})

export function setupSwagger (app: Application) {
    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(swagger, { explorer: true })
    );
}