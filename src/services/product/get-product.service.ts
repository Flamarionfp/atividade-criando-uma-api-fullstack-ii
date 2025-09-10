import { NotFoundException } from "../../core/error/exceptions/not-found.exception";
import { ProductRepository } from "../../repository/product.repository";

export class GetProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  execute = async (id: number) => {
    const product = await this.productRepository.findById(id);

    if (!product) throw new NotFoundException("Produto não encontrado");

    return product;
  };
}
