import request from "supertest";
import { formatResponse } from "../src/utils/responseFormat";
import Bootstrapapp from "../src/utils/bootstrap";
import { Application } from "express";

const app: Application = Bootstrapapp();

beforeEach(() => {
  jest.clearAllMocks();
});
const urls = [{ mainUrl: "Url1" }, { mainUrl: "Url2" }];
jest.mock("../src/controllers", () => ({
  shortenUrl: jest.fn(async (req, res) => {
    res.status(201).json(
      formatResponse({
        isSuccess: true,
        data: {
          mainUrl: "https://validUrl.com",
          shortendUrl: "mockedShortUrl",
        },
      })
    );
  }),
  getUrls: jest.fn(async (req, res) => {
    res.status(200).json(
      formatResponse({
        isSuccess: true,
        data: {
          pageCount: 2,
          limit: 1,
          page: 1,
          urls,
        },
      })
    );
  }),
}));
describe("Route Tests", () => {
  describe("/api/urls/shorten-url", () => {
    describe("POST /api/urls/shorten-url", () => {
      it("should shorten a url with a 201 status code", async () => {
        const urlData = {
          mainUrl: "https://validUrl.com",
        };

        const response = await request(app)
          .post("/api/urls/shorten-url")
          .send(urlData);

        expect(response.status).toBe(201);
        expect(response.body.data.mainUrl).toEqual("https://validUrl.com");
        expect(response.body.data.shortendUrl).toEqual("mockedShortUrl");
      });
    });
    describe("POST /api/urls/shorten-url", () => {
      it("should handle errors and return a 400 status code", async () => {
        const response = await request(app).post("/api/urls/shorten-url");

        expect(response.status).toBe(400);
      });
    });
  });
  describe("/api/urls/", () => {
    describe("GET /api/urls", () => {
      it("should return a list of shortend urls with a 200 status code", async () => {
        const response = await request(app).get("/api/urls").query({
          limit: "2",
          page: "1",
        });
        expect(response.status).toBe(200);
        expect(response.body.data.urls).toEqual(urls);
      });
      it("should handle errors and return a 400 status code", async () => {
        const response = await request(app).get("/api/urls");
        expect(response.status).toBe(400);
      });
    });
  });
});
