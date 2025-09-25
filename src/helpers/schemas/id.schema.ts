import * as z from "zod";
import { idValidation } from "../validation/id";

export const idSchema = z.object({
  id: idValidation,
});
