import { NextFunction, Request, Response } from "express";
import { CreateProductService } from "../../../services/product";
import { HttpStatus } from "../../../core/http/http-status.enum";
import { createProductBodySchema } from "../../../helpers/schemas/product.schema";
import { CreateUserService } from "../../../services/user";
import { createUserBodySchema } from "../../../helpers/schemas/user.schema";

export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedBody = createUserBodySchema.parse(req.body);

      const createdProduct = await this.createUserService.execute(parsedBody);

      return res.status(HttpStatus.CREATED).send(createdProduct);
    } catch (error) {
      next(error);
    }
  };
}
