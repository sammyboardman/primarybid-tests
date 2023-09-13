import { Request, Response } from "express";
import logger from "../utils/logger";
import service from "../services/";
import { formatResponse } from "../utils/responseFormat";
import constants from "../utils/constants";
import { PaginationQueryInput } from "../schemas/pagination";
import { CreateUrlInput } from "../schemas/url";

export const getUrls = async (
  // eslint-disable-next-line @typescript-eslint/ban-types
  req: Request<{}, {}, {}, PaginationQueryInput>,
  res: Response
) => {
  try {

    const limit = req.query.limit ?? 10;
    const page = req.query.page ?? 1;
    const skip: number = limit * (page - 1);
    const response = await service.getUrls({ limit, skip });

    if (!response.isSuccess) {
      return res.status(400).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    logger.error(error);
    res
      .status(400)
      .json(formatResponse({ message: constants.errorMessage.default }));
  }
};

export const shortenUrl = async (
  // eslint-disable-next-line @typescript-eslint/ban-types
  req: Request<{}, {}, CreateUrlInput["body"]>,
  res: Response
) => {
  try {
    let { mainUrl } = req.body;
    mainUrl = mainUrl.replace(/\/+$/, '');
    const response = await service.shortenUrl({ mainUrl });

    if (!response.isSuccess) {
      return res.status(400).json(response);
    }
    res.status(201).json(response);
  } catch (error) {
    logger.error(error);
    res
      .status(400)
      .json(formatResponse({ message: constants.errorMessage.default }));
  }
};
