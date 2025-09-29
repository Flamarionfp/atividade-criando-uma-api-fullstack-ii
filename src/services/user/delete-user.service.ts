import { NotFoundException } from "../../core/error/exceptions/not-found.exception";
import { OrderRepository } from "../../repository/order.repository";
import { UserRepository } from "../../repository/user.repository";

export class DeleteUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly orderRepository: OrderRepository
  ) {}

  execute = async (id: number) => {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundException("Usuário não encontrado");
    }

    await Promise.all([
      this.userRepository.delete(id),
      this.orderRepository.deleteByUserId(id),
    ]);
  };
}
