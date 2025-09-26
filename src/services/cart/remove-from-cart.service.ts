import { NotFoundException } from "../../core/error/exceptions/not-found.exception";
import { AuthenticatedUserDTO } from "../../dtos/user.dto";
import { CartRepository } from "../../repository/cart.repository";

export class RemoveFromCartService {
  constructor(private readonly cartRepository: CartRepository) {}

  execute = async (id: number, authenticatedUser: AuthenticatedUserDTO) => {
    const cartItem = await this.cartRepository.findById(id);

    if (!cartItem) {
      throw new NotFoundException(
        "Produto não encontrado no carrinho do usuário"
      );
    }

    await this.cartRepository.remove(id, authenticatedUser.requesterId);
  };
}
