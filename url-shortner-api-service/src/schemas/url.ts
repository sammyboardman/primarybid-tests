import { TypeOf, object, string } from "zod";

export const urlPayload = {
  body: object({
    mainUrl: string({
      required_error: "Main URL is required.",
    }).regex(
      /^(https?:\/\/)([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+)(\/[^\s]*)?$/,
      "Invalid URL."
    ),
  }),
};

export const createUrlPayloadSchema = object({
  ...urlPayload,
});

export type CreateUrlInput = TypeOf<typeof createUrlPayloadSchema>;
