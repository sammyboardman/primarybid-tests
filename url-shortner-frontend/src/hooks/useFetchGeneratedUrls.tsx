import { useState, useEffect } from "react";
import { SnipUrlController } from "../controllers";
import { IPagination, IGeneratedUrlsResponse } from "../interfaces";
import constants from "../utils/constants";

 const useFetchGeneratedUrls = ({ page, limit }: IPagination) => {
  const [loading, setLoading] = useState<boolean>(false);
 const [data, setData] = useState<IGeneratedUrlsResponse |  null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchData = async (values: IPagination) => {
    try {
      setLoading(true);
      const { status, data, errorMessage } =
        await SnipUrlController.getGeneratedUrls(values);

      if (status === constants.Success) {
        setData(data.data);
        setTotalPages(Math.ceil(data.data.pageCount / limit));
        setErrorMessage("");
      } else {
        setErrorMessage(errorMessage || "");
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(constants.DefaultErrorMesage);
    }
  };


  useEffect(() => {
    fetchData({ limit, page });
  }, [page, limit]);

  return {
    loading,
    data: data,
    errorMessage,
    totalPages,
    pageCount: data?.pageCount || 0,
    totalCount:  data?.totalCount || 0,
  };
};

export default useFetchGeneratedUrls;
