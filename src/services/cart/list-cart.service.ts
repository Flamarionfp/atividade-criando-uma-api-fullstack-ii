import { CartRepository } from "../../repository/cart.repository";

export class ListCartService {
  constructor(private readonly cartRepository: CartRepository) {}

  execute = async (userId: number) => {
    const cart = await this.cartRepository.findByUserId(userId);

    const total = cart.reduce((acc, item) => {
      return acc + item.productPrice;
    }, 0);

    return {
      items: cart,
      total,
    };
  };
}
