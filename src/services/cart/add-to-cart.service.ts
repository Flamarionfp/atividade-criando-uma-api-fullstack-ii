import { NotFoundException } from "../../core/error/exceptions/not-found.exception";

import { CartRepository } from "../../repository/cart.repository";
import { ProductRepository } from "../../repository/product.repository";

export class AddToCartService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cartRepository: CartRepository
  ) {}

  execute = async (productId: number, userId: number) => {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException("Produto não encontrado");
    }

    await this.cartRepository.add(productId, userId);
  };
}
