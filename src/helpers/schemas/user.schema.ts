import * as z from "zod";

const userSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["admin", "customer"]),
});

export const createUserBodySchema = z.object({
  ...userSchema.shape,
});

export const updateUserBodySchema = userSchema.partial();
