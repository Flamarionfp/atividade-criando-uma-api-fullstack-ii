import { NextFunction, Request, Response } from "express";
import { idSchema } from "../../../helpers/schemas/id.schema";
import { HttpStatus } from "../../../core/http/http-status.enum";
import { UpdateProductService } from "../../../services/product";
import { updateProductBodySchema } from "../../../helpers/schemas/product.schema";

export class UpdateProductController {
  constructor(private readonly updateProductService: UpdateProductService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = idSchema.parse(req.params);
      const parsedBody = updateProductBodySchema.parse(req.body);

      const updatedProduct = await this.updateProductService.execute(
        id,
        parsedBody
      );

      return res.status(HttpStatus.OK).send(updatedProduct);
    } catch (error) {
      next(error);
    }
  };
}
