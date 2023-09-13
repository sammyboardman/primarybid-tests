export interface IUseRequestOptions {
  baseUrl?: string;
  url: string;
  method?: "get" | "post" | "put" | "delete";
  payload?: Record<string, unknown>;
  query?: Record<string, unknown>;
  headers?: Record<string, any>;
}

export interface IApiRequestOptions {
  url: string;
  method: "get" | "post" | "put" | "delete";
  payload?: Record<string, any>;
  query?: Record<string, any>;
}

export interface IAPIResponse {
  status: string;
  errorMessage?: string;
  data?: any;
}

export interface IShortenUrlRequest {
  mainUrl: string;
}

export interface IPaginationProps {
  totalCount?: number;
  pageCount: number;
  page: number;
  setPage: (page: number) => void;
}

export interface IUrlInfo {
  _id: string;
  mainUrl: string;
  shortenedUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IPagination {
    limit: number;
    page: number;
}

export interface IGeneratedUrlsResponse {
  urls: IUrlInfo[];
  pageCount: number,
  totalCount: number;
}

export interface GenerateUrlsTableProps {
    goHome: () => void;
    loading: boolean;
    onSubmit: () => void;
    errorMessage: string | null;
    totalPages: number;
    pageCount: number;
    totalCount: number;
    page: number,
    setPage: () => void,
    data: {
      urls: Array<{
        createdAt: string;
        mainUrl: string;
        shortenedUrl: string;
      }>;
    };
  }