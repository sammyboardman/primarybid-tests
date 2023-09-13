import constant from './constants';
import client from './client';
import config from './config';
import { IUseRequestOptions,
    IApiRequestOptions,
    IAPIResponse} from '../interfaces'


const UseRequest = async ({
  baseUrl = config.BASE_API_URL,
  url,
  method = 'get',
  payload = {},
  headers = {},
}: IUseRequestOptions) => {
  const requestUrl = baseUrl + url;
  return await client[method](requestUrl, payload, { headers });
};

const apiRequest = async ({
  url,
  method,
  payload,
  query,
}: IApiRequestOptions) => {
  try {
    const requestObject: IUseRequestOptions = {
      url,
      method,
    };
    if (payload) requestObject.payload = payload;
    if (query) requestObject.query = query;

    const response = await UseRequest(requestObject);

    return { status: constant.Success, data: response.data };
  } catch (error: any) {

    const errorResponse: IAPIResponse = {
      status: constant.Failed,
      errorMessage: "",
      data: null
    }
    if(error.message) {
      errorResponse.errorMessage = error.message;
    } else {
      const { data } = error.response || {};
      errorResponse.errorMessage = data?.message ? data?.message : data?.data;
      errorResponse.data = data;
    }
    return errorResponse;
  }
};

export { apiRequest };
