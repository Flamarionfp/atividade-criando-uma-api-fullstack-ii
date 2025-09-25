import * as z from "zod";
import { idValidation } from "../validation/id";

const cartSchema = z.object({
  productId: idValidation,
});

export const addToCartBodySchema = z.object({
  ...cartSchema.shape,
});
