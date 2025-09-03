import { ProductSqliteRepository } from "../../../repository/sqlite/product-sqlite.repository";
import { DeleteProductService } from "../../../services/product";
import { DeleteProductController } from "./delete-product.controller";

export const makeDeleteProductController =
  async (): Promise<DeleteProductController> => {
    const productRepository = new ProductSqliteRepository();
    await productRepository.init();

    const deleteProductService = new DeleteProductService(productRepository);
    const deleteProductController = new DeleteProductController(
      deleteProductService
    );

    return deleteProductController;
  };
