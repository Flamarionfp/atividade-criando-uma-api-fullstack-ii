import { NextFunction, Request, Response } from "express";
import { CreateProductService } from "../../../services/product";
import { HttpStatus } from "../../../core/http/http-status.enum";
import { createProductBodySchema } from "../../../helpers/schemas/product.schema";

export class CreateProductController {
  constructor(private readonly createProductService: CreateProductService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedBody = createProductBodySchema.parse(req.body);

      const createdProduct = await this.createProductService.execute(
        parsedBody
      );

      return res.status(HttpStatus.CREATED).send(createdProduct);
    } catch (error) {
      next(error);
    }
  };
}
