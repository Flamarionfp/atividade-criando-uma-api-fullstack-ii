import { NextFunction, Request, Response } from "express";
import { GetUserService } from "../../../services/user";
import { idSchema } from "../../../helpers/schemas/id.schema";
import { userRequestSchema } from "../../../helpers/schemas/user.schema";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authenticatedUser = userRequestSchema.parse(req.user);
      const { id } = idSchema.parse(req.params);
      const user = await this.getUserService.execute(id, authenticatedUser);

      return res.status(HttpStatus.OK).send(user);
    } catch (error) {
      next(error);
    }
  };
}
