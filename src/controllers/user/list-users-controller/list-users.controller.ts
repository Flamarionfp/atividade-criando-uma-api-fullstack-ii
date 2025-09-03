import { Request, Response, NextFunction } from "express";
import { ListUsersService } from "../../../services/user";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class ListUsersController {
  constructor(private readonly listUsersService: ListUsersService) {}

  handle = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.listUsersService.execute();

      return res.status(HttpStatus.OK).send(users);
    } catch (error) {
      next(error);
    }
  };
}
