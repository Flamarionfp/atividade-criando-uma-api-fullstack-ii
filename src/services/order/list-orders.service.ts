import { Role } from "../../@types/role";
import { AuthenticatedUserDTO } from "../../dtos/user.dto";
import { OrderRepository } from "../../repository/order.repository";

export class ListOrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute = async (authenticatedUser: AuthenticatedUserDTO) => {
    const { requesterId, role } = authenticatedUser;

    let orders = [];

    if (role === Role.ADMIN) {
      orders = await this.orderRepository.listAll();

      return orders;
    }

    orders = await this.orderRepository.list(requesterId);

    return orders;
  };
}
