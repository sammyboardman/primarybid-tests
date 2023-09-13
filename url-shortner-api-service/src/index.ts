import { Application } from "express";
import config from "./utils/config";
import logger from "./utils/logger";
import connectToDatabase from "./utils/database";
import BootstrapServer from "./utils/bootstrap";

const app: Application = BootstrapServer();

const port = config.port;

const server = app.listen(port, () => {
  connectToDatabase();
  logger.info(`Server is running on port ${port}`);
});

export { server };
