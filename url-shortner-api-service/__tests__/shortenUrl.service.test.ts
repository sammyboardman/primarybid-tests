import constants from "../src/utils/constants";
import { formatResponse } from "../src/utils/responseFormat";
import services from "../src/services";
import { ShortendUrl } from "../src/models";

jest.mock("../src/models");

describe("Service Tests", () => {
  const mockShortendUrl = ShortendUrl as jest.Mocked<typeof ShortendUrl>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get URLs successfully", async () => {
    const limit = 10;
    const skip = 0;
    const totalCount = 20;
    const pageCount = 2;
    const urls = [{ mainUrl: "url1", shortenedUrl: "short1" }];

    // Mock the Mongoose functions
    const countDocumentsMock = jest
      .spyOn(ShortendUrl, "countDocuments")
      .mockResolvedValue(totalCount);
    const findMock = jest.spyOn(ShortendUrl, "find").mockResolvedValue(urls);

    const result = await services.getUrls({ limit, skip });

    expect(countDocumentsMock).toHaveBeenCalledWith({});
    expect(findMock).toHaveBeenCalledWith(
      {},
      {},
      {
        skip,
        limit,
        sort: {
          createdAt: -1,
        },
      }
    );
    expect(result).toEqual(
      formatResponse({
        isSuccess: true,
        data: {
          urls,
          pageCount,
          totalCount,
        },
      })
    );
  });

  it("should shorten a URL successfully", async () => {
    const mainUrl = "https://example.com";
    const shortenedUrl = "https://shortened-url.com";

    const findOneMock = mockShortendUrl.findOne.mockResolvedValue(null);
    jest.spyOn(mockShortendUrl, "create").mockResolvedValue([
      new ShortendUrl({
        mainUrl,
        shortenedUrl,
      }),
    ]);
    const result = await services.shortenUrl({ mainUrl });

    expect(findOneMock).toHaveBeenCalledWith({ mainUrl });
    expect(result.isSuccess).toEqual(true);
  });

  it("should handle an error in getUrls", async () => {
    jest
      .spyOn(ShortendUrl, "countDocuments")
      .mockRejectedValue(new Error("Test Error"));
    jest.spyOn(ShortendUrl, "find").mockRejectedValue(new Error("Test Error"));

    const result = await services.getUrls({ limit: 10, skip: 0 });

    expect(result).toEqual(
      formatResponse({
        message: constants.errorMessage.default,
      })
    );
  });

  it("should handle an error in shortenUrl", async () => {
    mockShortendUrl.findOne.mockRejectedValue(new Error("Test Error"));

    const result = await services.shortenUrl({
      mainUrl: "https://example.com",
    });

    expect(result).toEqual(
      formatResponse({
        isSuccess: false,
        message: constants.errorMessage.default,
      })
    );
  });
});
