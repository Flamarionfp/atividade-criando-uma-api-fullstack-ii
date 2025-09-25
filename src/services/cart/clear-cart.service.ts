import { CartRepository } from "../../repository/cart.repository";

export class ClearCartService {
  constructor(private readonly cartRepository: CartRepository) {}

  execute = async (userId: number) => {
    await this.cartRepository.clear(userId);
  };
}
