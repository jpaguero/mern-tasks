import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

// Defineing Options in Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERNTasks API",
      version: "1.0.0",
      description: "API MERN to handle tasks and autentication.",
    },
    servers: [
      {
        url: "http://localhost:5174",
        description: "Local Server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Swagger serch for endpoints
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app: Application) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at http://localhost:5174/docs");
};

export default setupSwagger;
