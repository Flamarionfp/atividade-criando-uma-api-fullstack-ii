import * as z from "zod";

export const idValidation = z.coerce.number().min(1);
