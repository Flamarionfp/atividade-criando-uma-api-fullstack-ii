import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../core/http/http-status.enum";
import { authBodySchema } from "../../helpers/schemas/auth.schema";
import { AuthService } from "../../services/auth";
import { AuthDTO } from "../../dtos/auth.dto";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedBody = authBodySchema.parse(req.body);

      const response = await this.authService.execute(parsedBody as AuthDTO);

      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      next(error);
    }
  };
}
