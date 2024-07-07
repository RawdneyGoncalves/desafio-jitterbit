import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import dotenv from 'dotenv';
import errorHandler from "./middleware/errorHandler";
import orderRoutes from "./routes/orderRoutes";
import authRoutes from "./routes/authRoutes";
import logger from "./utils/logger";
import swaggerUi from "swagger-ui-express";
import { specs } from "../swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/order", orderRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

(async () => {
  app.use("/order", orderRoutes);
  app.use("/auth", authRoutes);

  app.use(errorHandler);

  try {
    app.listen(PORT, () => {
      logger.info(`Servidor iniciado na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
})();

export default app;