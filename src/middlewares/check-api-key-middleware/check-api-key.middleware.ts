import { UnauthorizedException } from "../../core/error/exceptions/unauthorized.exception";
import { Request, Response, NextFunction } from "express";

export class CheckApiKeyMiddleware {
  handle = (req: Request, _: Response, next: NextFunction) => {
    const apiKey = req.headers["api-key"] || req.query.apiKey;

    if (!apiKey || apiKey !== process.env.API_KEY) {
      return next(new UnauthorizedException("Autenticação inválida"));
    }

    next();
  };
}
