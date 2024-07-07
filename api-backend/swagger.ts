import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jitterbit API",
      version: "1.0.0",
      description:
        "Documentação da API, desafio Jitterbit",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export { specs };