import { z, TypeOf } from "zod";

export const paginationQuerySchema = z.object({
  limit: z.coerce
    .number({
      required_error: "Limit should be a number.",
    })
    .min(1),

  page: z.coerce
    .number({
      required_error: "Page should be a number.",
    })
    .min(1),
});

export type PaginationQueryInput = TypeOf<typeof paginationQuerySchema>;
