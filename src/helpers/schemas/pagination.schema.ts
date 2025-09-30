import * as z from "zod";
import { PAGINATION_DEFAULT_LIMIT } from "../../constants/pagination";

export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .default("1")
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, {
      message: "O parâmetro 'page' deve ser maior que 0",
    }),
  limit: z
    .string()
    .optional()
    .default(`${PAGINATION_DEFAULT_LIMIT}`)
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0 && val <= 100, {
      message: "O parâmetro 'limit' deve estar entre 1 e 100",
    }),
});
