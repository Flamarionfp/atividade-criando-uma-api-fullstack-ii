import * as z from "zod";

const productSchema = z.object({
  name: z.string().trim(),
  price: z.coerce.number().min(1),
  trade: z.string().trim(),
  model: z.string().trim(),
  specifications: z.array(z.string()),
  thumb: z.url(),
  year: z
    .union([
      z.string().regex(/^(\d{4}-\d{2}-\d{2})$/, { message: "Data inválida" }),
      z.date(),
    ])
    .transform((val) => {
      if (val instanceof Date) {
        return val.toISOString().split("T")[0];
      }

      return val;
    }),
});

export const createProductBodySchema = z.object({
  ...productSchema.shape,
});

export const filterProductsQuerySchema = productSchema.partial();

export const updateProductBodySchema = productSchema.partial();
