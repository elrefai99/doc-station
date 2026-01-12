import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { readFileSync } from 'fs';
import { resolve } from 'path';

const packageJson = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'));
const appVersion = packageJson.version;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "APIs Docs",
      version: appVersion,
      description: "API documentation for Doc Station",
    },
    servers: [
      {
        url: "http://localhost:9000",
        description: "Live URL",
      },
    ],
  },
  apis: [
    './src/modules/**/*.swagger.ts',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger docs endpoints available at:", process.env.NODE_ENV === "development" ? `${String(process.env.SITE_API_Local_URL)}/api-docs` : `${String(process.env.SITE_API_URL)}/api-docs`);
}
