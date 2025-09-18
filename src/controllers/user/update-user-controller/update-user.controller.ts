import { Request, Response, NextFunction } from "express";
import { idSchema } from "../../../helpers/schemas/id.schema";
import {
  updateUserBodySchema,
  userRequestSchema,
} from "../../../helpers/schemas/user.schema";
import { UpdateUserService } from "../../../services/user";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authenticatedUser = userRequestSchema.parse(req.user);
      const { id } = idSchema.parse(req.params);
      const parsedBody = updateUserBodySchema.parse(req.body);

      const updatedUser = await this.updateUserService.execute(
        id,
        parsedBody,
        authenticatedUser
      );

      return res.status(HttpStatus.OK).send(updatedUser);
    } catch (error) {
      next(error);
    }
  };
}
