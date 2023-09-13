import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger";
import config from "./config";

dotenv.config();

const dbUri = config.databaseUrl;

export default async function connectToDatabase() {
  try {
    await mongoose.connect(dbUri);
  } catch (err) {
    logger.error(`MongoDB connection error: ${err}`);
  }
}
