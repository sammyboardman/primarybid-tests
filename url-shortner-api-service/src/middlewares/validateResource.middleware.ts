import { Response, Request, NextFunction } from "express";
import { AnyZodObject } from "zod";
import logger from "../utils/logger";
import { ParamsDictionary } from "express-serve-static-core";
import { PaginationQueryInput } from "../schemas/pagination";

export const validateBodyParams =
  (schema: AnyZodObject) =>
  async (
    // eslint-disable-next-line @typescript-eslint/ban-types
    req: Request<ParamsDictionary, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      schema.parse({ body: req.body });
      next();
    } catch (error: Error | unknown) {
      logger.error(error);
      return res.status(400).json({ isSuccess: false, data: error });
    }
  };

export const validateQueryParams =
  (schema: AnyZodObject) =>
  async (
    // eslint-disable-next-line @typescript-eslint/ban-types
    req: Request<ParamsDictionary, {}, {}, PaginationQueryInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      schema.parse(req.query);
      next();
    } catch (error: Error | unknown) {
      return res.status(400).json({ isSuccess: false, data: error });
    }
  };
