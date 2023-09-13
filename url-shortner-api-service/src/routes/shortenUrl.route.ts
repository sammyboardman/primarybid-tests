import { Router } from "express";
import controller from "../controllers";
import { paginationQuerySchema } from "../schemas/pagination";
import {
  validateBodyParams,
  validateQueryParams,
} from "../middlewares/";
import { createUrlPayloadSchema } from "../schemas/url";

const router = Router();

/**
 * @swagger
 * /api/urls:
 *   get:
 *     summary: Get a list of shortened URLs
 *     description: Retrieve a list of shortened URLs.
 *     responses:
 *       200:
 *         description: A list of shortened URLs.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: true
 *               data:
 *                 urls:
 *                   - _id: '64fb9ded82eb3a0345be0c7b'
 *                     mainUrl: 'https://google.com'
 *                     shortenedUrl: 'a1be0bb3'
 *                     createdAt: '2023-09-08T22:19:25.009Z'
 *                     updatedAt: '2023-09-08T22:19:25.009Z'
 *                     __v: 0
 *                 pageCount: 12
 *                 totalCount: 12
 *               message: ''
 *       default:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: false
 *               message: 'An error occurred.'
 */

router.get(
  "/urls",
  validateQueryParams(paginationQuerySchema),
  controller.getUrls
);

/**
 * @swagger
 * /api/urls/shorten-url:
 *   post:
 *     summary: Shorten a URL
 *     description: Shorten a URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mainUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: URL shortened successfully.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: true
 *               data:
 *                 mainUrl: 'https://test.com'
 *                 shortenedUrl: 'https://pbid.io/abe741c6'
 *                 _id: '64fe31d0aa7c0deceb6b9e63'
 *                 createdAt: '2023-09-10T21:14:56.994Z'
 *                 updatedAt: '2023-09-10T21:14:56.994Z'
 *                 __v: 0
 *               message: ''
 *       default:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             example:
 *               isSuccess: false
 *               message: 'An error occurred.'
 */

router.post(
  "/urls/shorten-url",
  validateBodyParams(createUrlPayloadSchema),
  controller.shortenUrl
);

export default router;
