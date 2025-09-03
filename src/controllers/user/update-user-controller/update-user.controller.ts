import { Request, Response, NextFunction } from "express";
import { idSchema } from "../../../helpers/schemas/id.schema";
import { updateUserBodySchema } from "../../../helpers/schemas/user.schema";
import { UpdateUserService } from "../../../services/user";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = idSchema.parse(req.params);
      const parsedBody = updateUserBodySchema.parse(req.body);

      const updatedUser = await this.updateUserService.execute(id, parsedBody);

      return res.status(HttpStatus.OK).send(updatedUser);
    } catch (error) {
      next(error);
    }
  };
}
