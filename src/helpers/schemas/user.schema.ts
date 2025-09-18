import * as z from "zod";
import { emailValidation } from "../validation/email";
import { passwordValidation } from "../validation/password";
import { Role } from "../../@types/role";

const userSchema = z.object({
  name: z.string().trim(),
  email: emailValidation,
  password: passwordValidation,
  role: z.enum(Role),
});

export const createUserBodySchema = z.object({
  ...userSchema.shape,
});

export const updateUserBodySchema = userSchema
  .partial()
  .omit({ password: true });

export const userRequestSchema = z.object({
  requesterId: z.int(),
  role: z.enum(Role),
});
