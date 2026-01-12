import swaggerJSDoc from "swagger-jsdoc"; 

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TicTacTrip Justify API",
      version: "1.0.0",
      description: "API REST pour justifier du texte sur 80 caractères",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    servers: [
      {
        // Utiliser l'URL publique de Render si disponible
        url: process.env.RENDER_EXTERNAL_URL || "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
