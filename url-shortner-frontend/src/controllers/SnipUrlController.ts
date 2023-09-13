import { apiRequest } from "../utils/useAPIRequest";
import constant from "../utils/constants";
import { IAPIResponse, IPagination, IShortenUrlRequest } from "../interfaces";

const getGeneratedUrls = async ({
  limit,
  page,
}: IPagination ): Promise<IAPIResponse> => {
  try {
    const { status, errorMessage, data } = await apiRequest({
      url: `/api/urls?limit=${limit}&page=${page}`,
      method: "get",
    });
    if (status === constant.Success) {
      return { status, data };
    }
    return { status, errorMessage };
  } catch (error: any) {
    return { status: constant.Failed, errorMessage: error.message };
  }
};


const shortenUrl = async ({
  mainUrl,
}: IShortenUrlRequest): Promise<IAPIResponse> => {
  try {
    mainUrl = mainUrl.replace(/\/+$/, '');
    const { status, errorMessage, data } = await apiRequest({
      url: "/api/urls/shorten-url",
      method: "post",
      payload: { mainUrl },
    });
    if (status === constant.Success) {
      return { status, data };
    }
    return { status, errorMessage, data };
  } catch (error: any) {
    return { status: constant.Failed, errorMessage: error.message };
  }
};
const snipControllers = { shortenUrl, getGeneratedUrls };
export default snipControllers;
