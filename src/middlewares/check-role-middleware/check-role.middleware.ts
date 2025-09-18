import { NextFunction, Request, Response } from "express";
import { ForbiddenException } from "../../core/error/exceptions/forbidden.exception";
import { Role } from "../../@types/role";

export class CheckRoleMiddleware {
  private check = (checkRole: Role) => {
    return (req: Request, _: Response, next: NextFunction) => {
      const { role } = req.user;

      if (role !== checkRole) {
        return next(new ForbiddenException("Usuário não autorizado"));
      }

      return next();
    };
  };

  private handleVerifyRole =
    (checkRole: Role) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const middleware = this.check(checkRole);

      return middleware(req, res, next);
    };

  admin = this.handleVerifyRole(Role.ADMIN);
  customer = this.handleVerifyRole(Role.CUSTOMER);
}
