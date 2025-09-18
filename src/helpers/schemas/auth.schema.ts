import z from "zod";
import { emailValidation } from "../validation/email";
import { passwordValidation } from "../validation/password";

export const authBodySchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
