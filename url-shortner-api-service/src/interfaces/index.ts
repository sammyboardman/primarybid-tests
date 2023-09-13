export interface ICustomErrorDTO {
  error: string;
  message?: string;
}

export interface IShortendUrlDTO {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  mainUrl: string;
  shortenedUrl?: string;
}
export interface IServiceResponseDTO {
  isSuccess: boolean;
  message?: string;
  data: unknown;
}
export interface ISchemaRulesDTO {
    keys: Set<string>,
    validationRules: { key: string, required: boolean, type: string, min?: number }[]
}
