import { BadRequestException } from "../../core/error/exceptions/bad-request.exception";
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

    const existingCartItems =
      await this.cartRepository.findItemByProductAndUser(productId, userId);

    if (existingCartItems.length > 0) {
      throw new BadRequestException("Produto já está no carrinho");
    }

    await this.cartRepository.add(productId, userId);
  };
}
