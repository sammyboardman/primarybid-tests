/* eslint-disable @typescript-eslint/no-var-requires */
import { SnipUrlController } from "../../controllers";
import { apiRequest } from "../../utils/useAPIRequest";
import constants from "../../utils/constants";

const { shortenUrl, getGeneratedUrls } = SnipUrlController;

jest.mock("../../utils/useAPIRequest", () => ({
  apiRequest: jest.fn(),
}));

describe("snipControllers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getGeneratedUrls", () => {
    it("should call apiRequest with the correct URL and method", async () => {
      const mockApiRequestResponse = {
        status: constants.Success,
        data: ["url1", "url2"],
      };
      (
        require("../../utils/useAPIRequest").apiRequest as jest.Mock
      ).mockResolvedValue(mockApiRequestResponse);
      const result = await getGeneratedUrls({ limit: 10, page: 1 });

      expect(apiRequest).toHaveBeenCalledWith({
        url: "/api/urls?limit=10&page=1",
        method: "get",
      });
      expect(result).toEqual({
        status: constants.Success,
        data: ["url1", "url2"],
      });
    });

    it("should handle API request failure", async () => {

      const mockApiRequestResponse = {
        status: constants.Failed,
        errorMessage: "API request failed",
      };
      (
        require("../../utils/useAPIRequest").apiRequest as jest.Mock
      ).mockResolvedValue(mockApiRequestResponse);

      const result = await getGeneratedUrls({ limit: 10, page: 1 });

      expect(apiRequest).toHaveBeenCalledWith({
        url: "/api/urls?limit=10&page=1",
        method: "get",
      });
      expect(result).toEqual({
        status: constants.Failed,
        errorMessage: "API request failed",
      });
    });
  });

  describe("shortenUrl", () => {
    it("should call apiRequest with the correct URL, method, and payload", async () => {
      const mockApiRequestResponse = {
        status: constants.Success,
        data: { shortenedUrl: "https://short.url" },
      };
      (
        require("../../utils/useAPIRequest").apiRequest as jest.Mock
      ).mockResolvedValue(mockApiRequestResponse);

      const result = await shortenUrl({ mainUrl: "https://example.com" });

      expect(apiRequest).toHaveBeenCalledWith({
        url: "/api/urls/shorten-url",
        method: "post",
        payload: { mainUrl: "https://example.com" },
      });
      expect(result).toEqual(mockApiRequestResponse);
    });

    it("should handle API request failure", async () => {
      // Mock the failed apiRequest response
      const mockApiRequestResponse = {
        status: constants.Failed,
        errorMessage: "API request failed",
      };
      (
        require("../../utils/useAPIRequest").apiRequest as jest.Mock
      ).mockResolvedValue(mockApiRequestResponse);

      const result = await shortenUrl({ mainUrl: "https://example.com" });

      expect(apiRequest).toHaveBeenCalledWith({
        url: "/api/urls/shorten-url",
        method: "post",
        payload: { mainUrl: "https://example.com" },
      });
      expect(result).toEqual(mockApiRequestResponse);
    });
  });

});

// You can also test the snipControllers object if needed.
describe("snipControllers object", () => {
  it("should have shortenUrl and getGeneratedUrls functions", () => {
    expect(SnipUrlController.shortenUrl).toBeInstanceOf(Function);
    expect(SnipUrlController.getGeneratedUrls).toBeInstanceOf(Function);
  });
});
