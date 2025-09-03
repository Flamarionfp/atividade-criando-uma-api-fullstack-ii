import { Request, Response, NextFunction } from "express";
import { DeleteUserService } from "../../../services/user";
import { idSchema } from "../../../helpers/schemas/id.schema";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = idSchema.parse(req.params);

      await this.deleteUserService.execute(id);

      return res.status(HttpStatus.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  };
}
