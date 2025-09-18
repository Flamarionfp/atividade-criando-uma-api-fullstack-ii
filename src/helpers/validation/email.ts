import * as z from "zod";

export const emailValidation = z.email().trim();
