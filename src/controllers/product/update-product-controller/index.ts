import { ProductSqliteRepository } from "../../../repository/sqlite/product-sqlite.repository";
import { UpdateProductService } from "../../../services/product";
import { UpdateProductController } from "./update-product.controller";

export const makeUpdateProductController =
  async (): Promise<UpdateProductController> => {
    const productRepository = new ProductSqliteRepository();
    await productRepository.init();

    const updateProductService = new UpdateProductService(productRepository);
    const updateProductController = new UpdateProductController(
      updateProductService
    );

    return updateProductController;
  };
