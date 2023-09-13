import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig";
import { shortenUrlRoute } from "../routes";

const BootstrapServer = (): Application => {
  const app = express();

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use("/api", shortenUrlRoute);

  return app;
};

export default BootstrapServer;
