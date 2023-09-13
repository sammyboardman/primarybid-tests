import { QueryOptions } from "mongoose";
import * as crypto from "crypto";
import logger from "../utils/logger";
import config from "../utils/config";
import { ShortendUrl } from "../models";
import { IServiceResponseDTO, IShortendUrlDTO } from "../interfaces";
import constants from "../utils/constants";
import { formatResponse } from "../utils/responseFormat";

export const getUrls = async ({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}): Promise<IServiceResponseDTO> => {
  try {
    const options: QueryOptions = { skip, limit, sort: { createdAt: -1 } };
    const totalCount = await ShortendUrl.countDocuments({});
    const urls = await ShortendUrl.find({}, {}, options);
    const pageCount = Math.ceil(totalCount / limit);

    return formatResponse({
      isSuccess: true,
      data: {
        urls,
        pageCount,
        totalCount,
      },
    });
  } catch (error) {
    logger.error(error);
    return formatResponse({
      message: constants.errorMessage.default,
    });
  }
};

export const shortenUrl = async (
  payload: IShortendUrlDTO
): Promise<IServiceResponseDTO> => {
  try {
    const { mainUrl } = payload;
    let response = await ShortendUrl.findOne({ mainUrl });

    if (response) {
      return formatResponse({
        isSuccess: true,
        data: response,
      });
    }
    const uniqueSalt = crypto.randomBytes(16).toString("hex");
    const uniqueInput = mainUrl + uniqueSalt;
    const hash = crypto.createHash("sha256").update(uniqueInput).digest("hex");
    const shortenedUrl = `${config.shortnerBaseUrl}/${hash.substring(0, 8)}`;
    response = await ShortendUrl.create({ mainUrl, shortenedUrl });
    return formatResponse({
      isSuccess: true,
      data: response,
    });
  } catch (error) {
    logger.error(error);
    return formatResponse({
      isSuccess: false,
      message: constants.errorMessage.default,
    });
  }
};
