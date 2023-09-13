import { IServiceResponseDTO } from "../interfaces";

export const formatResponse = ({
  isSuccess = false,
  data = {},
  message = ""

}: {isSuccess?: boolean, data?: unknown,  message? : string }): IServiceResponseDTO => {
  return { isSuccess, data, message };
};
