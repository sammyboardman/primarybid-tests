import { useState } from "react";
import { SnipUrlController } from "../controllers";
import {  IUrlInfo, IShortenUrlRequest } from "../interfaces";
import constants from "../utils/constants";

 const useShortenUrl = () => {
  const [loading, setLoading] = useState<boolean>(false);
 const [data, setData] = useState<IUrlInfo |  null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async (values: IShortenUrlRequest) => {
    try {
      setLoading(true);
      const { status, data, errorMessage } =
        await SnipUrlController.shortenUrl(values);

      if (status === constants.Success) {
        setData(data.data);
        setLoading(false);
        setErrorMessage("");
      } else {
        setErrorMessage(errorMessage || "");
      }
      setLoading(false);
    } catch (error: any) {
      setErrorMessage(constants.DefaultErrorMesage);
      setLoading(false);
    }
  };
  const urlRegex = /^(https?:\/\/)([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+)(\/[^\s]*)?$/;

  const isUrlValid = (url: string) => {
    if (!urlRegex.test(url)) {
      return 'Invalid URL';
    }
    return undefined;
  };
  return {
    onSubmit,
    isUrlValid,
    loading,
    shortenedUrl: data?.shortenedUrl,
    errorMessage,
  };
};

export default useShortenUrl;
