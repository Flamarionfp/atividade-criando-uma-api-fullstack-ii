import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../../core/error/exceptions/unauthorized.exception";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRepository } from "../../repository/user.repository";

export class AuthMiddleware {
  constructor(private readonly userRepository: UserRepository) {}

  handle = async (req: Request, _: Response, next: NextFunction) => {
    const { authorization = "" } = req.headers;

    if (!authorization) {
      return next(new UnauthorizedException("Token não informado"));
    }

    const [, token] = authorization.split(" ");

    if (!token) {
      return next(new UnauthorizedException("Token não informado"));
    }

    try {
      const secret = process.env.JWT_SECRET ?? "";
      const decoded = jwt.verify(token, secret);
      const { id } = decoded as JwtPayload;

      const userData = await this.userRepository.findById(id);

      if (!userData) {
        return next(new UnauthorizedException("Login inválido"));
      }

      const { role } = userData;

      req.user = {
        requesterId: id,
        role,
      };

      return next();
    } catch (error) {
      return next(new UnauthorizedException("Login inválido"));
    }
  };
}
