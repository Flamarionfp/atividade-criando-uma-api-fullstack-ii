import { Role } from "../../@types/role";
import { ForbiddenException } from "../../core/error/exceptions/forbidden.exception";
import { NotFoundException } from "../../core/error/exceptions/not-found.exception";
import { AuthenticatedUserDTO } from "../../dtos/user.dto";
import { OrderRepository } from "../../repository/order.repository";

export class GetOrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute = async (id: number, authenticatedUser: AuthenticatedUserDTO) => {
    const order = await this.orderRepository.findById(id);

    if (!order) throw new NotFoundException("Pedido não encontrado");

    const { requesterId, role } = authenticatedUser;

    if (order.userId !== requesterId && role !== Role.ADMIN) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este pedido"
      );
    }

    return order;
  };
}
