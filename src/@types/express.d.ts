import { Request } from "express";
import { Role } from "./role";

export declare global {
  namespace Express {
    interface Request {
      user: {
        requesterId: string;
        role: Role;
      };
    }
  }
}
