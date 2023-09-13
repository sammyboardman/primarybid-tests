import mongoose from "mongoose";
import logger from "../src/utils/logger";
import config from "../src/utils/config";
import connectToDatabase from "../src/utils/database";

const mockMongooseConnect = jest.fn();

beforeAll(async () => {
  mongoose.connect = mockMongooseConnect;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
  jest.clearAllMocks();
});

describe("connectToDatabase Function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  jest.spyOn(logger, "info").mockImplementation();
  jest.spyOn(logger, "error").mockImplementation();

  it("should connect to the database", async () => {
    await connectToDatabase();
    expect(mockMongooseConnect).toHaveBeenCalledWith(config.databaseUrl);
  });

  it("should handle database connection errors", async () => {
    const mockError = new Error("Connection error");
    mockMongooseConnect.mockRejectedValue(mockError);
    await connectToDatabase();
    expect(mockMongooseConnect).toHaveBeenCalledWith(config.databaseUrl);
    expect(logger.error).toHaveBeenCalledWith(
      `MongoDB connection error: ${mockError}`
    );
  });
});
