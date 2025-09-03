import { NotFoundException } from "../../core/error/exceptions/not-found.exception";
import { ProductRepository } from "../../repository/product.repository";

export class DeleteProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  execute = async (id: number) => {
    const existingProduct = await this.productRepository.findById(id);

    if (!existingProduct) {
      throw new NotFoundException("Esse produto não existe");
    }

    await this.productRepository.delete(id);
  };
}
