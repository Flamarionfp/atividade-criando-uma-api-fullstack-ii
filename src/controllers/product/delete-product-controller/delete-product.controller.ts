import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../core/http/http-status.enum";
import { DeleteProductService } from "../../../services/product";
import { idSchema } from "../../../helpers/schemas/id.schema";

export class DeleteProductController {
  constructor(private readonly deleteProductService: DeleteProductService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = idSchema.parse(req.params);

      await this.deleteProductService.execute(id);

      return res.status(HttpStatus.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  };
}
