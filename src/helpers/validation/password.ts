import * as z from "zod";

export const passwordValidation = z.string().min(6).trim();
