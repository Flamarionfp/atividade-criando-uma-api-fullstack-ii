import { CartRepository } from "../../repository/cart.repository";

export class ListCartService {
  constructor(private readonly cartRepository: CartRepository) {}

  execute = async (userId: number) => {
    const cart = await this.cartRepository.findByUserId(userId);

    return cart;
  };
}
