import { renderHook, } from "@testing-library/react-hooks";
import { SnipUrlController } from "../../controllers";
import { useFetchGeneratedUrls } from "../../hooks";
import constants from "../../utils/constants";

jest.mock("../../controllers/SnipUrlController", () => ({
  getGeneratedUrls: jest.fn(),
}));

describe("useFetchGeneratedUrls", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data successfully", async () => {
    const mockData = {
      status: constants.Success,
      data: {
        isSuccess: true,
        message: "",
        data: {
          pageCount: 20,
          totalCount: 50,
          urls: [
            {
              createdAt: "2023-09-01T00:00:00Z",
              mainUrl: "https://example.com",
              shortenedUrl: "https://short.url/abc123",
            },
          ],
        },
      },
    };

    (SnipUrlController.getGeneratedUrls as jest.Mock).mockResolvedValue(
      mockData
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchGeneratedUrls({ page: 1, limit: 10 })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.errorMessage).toBe("");
    expect(result.current.totalPages).toBe(1);

    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData.data.data);
    expect(result.current.errorMessage).toBe("");
    expect(result.current.totalPages).toBe(2);

  });
});
