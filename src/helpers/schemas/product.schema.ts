import * as z from "zod";

const productSchema = z.object({
  name: z.string().trim(),
  price: z.coerce.number().min(1),
});

export const createProductBodySchema = z.object({
  ...productSchema.shape,
});

export const filterProductsQuerySchema = productSchema.partial();

export const updateProductBodySchema = productSchema.partial();
