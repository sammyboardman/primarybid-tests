/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response } from "express";
import controllers from "../src/controllers";
import constants from "../src/utils/constants";
import { formatResponse } from "../src/utils/responseFormat";
import { PaginationQueryInput } from "../src/schemas/pagination";
import { CreateUrlInput } from "../src/schemas/url";

jest.mock("../src/services", () => ({
  getUrls: jest.fn(),
  shortenUrl: jest.fn(),
}));

describe("Controller Tests", () => {
  const testErrorMessage = "Test Error Message";

  // eslint-disable-next-line @typescript-eslint/ban-types
  const req: Partial<Request<{}, {}, {}, PaginationQueryInput>> = {};
  const res: Partial<Response> = {
    json: jest.fn(),
    status: jest.fn(() => res as Response<unknown, Record<string, unknown>>),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle valid getUrls request", async () => {
    req.query = { page: 1, limit: 10 };

    const mockGetUrlsResponse = {
      isSuccess: true,
      data: ["url1", "url2"],
    };
    (require("../src/services").getUrls as jest.Mock).mockResolvedValue(
      mockGetUrlsResponse
    );

    await controllers.getUrls(
      // eslint-disable-next-line @typescript-eslint/ban-types
      req as Request<{}, {}, {}, PaginationQueryInput>,
      res as Response
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockGetUrlsResponse);
    expect(require("../src/services").getUrls).toHaveBeenCalledWith({
      limit: 10,
      skip: 0,
    });
  });

  it("should handle valid shortenUrl request", async () => {
    const req: Partial<Request<{}, {}, CreateUrlInput["body"]>> = {};

    req.body = { mainUrl: "https://example.com" };
    const mockShortenUrlResponse = {
      isSuccess: true,
      data: { shortenedUrl: "https://short.url" },
    };
    (require("../src/services").shortenUrl as jest.Mock).mockResolvedValue(
      mockShortenUrlResponse
    );

    await controllers.shortenUrl(
      // eslint-disable-next-line @typescript-eslint/ban-types
      req as Request<{}, {}, CreateUrlInput["body"]>,
      res as Response
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockShortenUrlResponse);
    expect(require("../src/services").shortenUrl).toHaveBeenCalledWith({
      mainUrl: "https://example.com",
    });
  });

  it("should handle error and log it", async () => {
    (require("../src/services").getUrls as jest.Mock).mockRejectedValue(
      new Error(testErrorMessage)
    );

    await controllers.getUrls(
      req as Request<{}, {}, {}, PaginationQueryInput>,
      res as Response
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      formatResponse({ message: constants.errorMessage.default })
    );
  });
});
