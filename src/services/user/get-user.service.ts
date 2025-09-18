import { ForbiddenException } from "../../core/error/exceptions/forbidden.exception";
import { NotFoundException } from "../../core/error/exceptions/not-found.exception";
import { AuthenticatedUserDTO } from "../../dtos/user.dto";
import { UserRepository } from "../../repository/user.repository";

export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  execute = async (id: number, authenticatedUser: AuthenticatedUserDTO) => {
    const { requesterId } = authenticatedUser;

    if (id !== requesterId) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar esse usuário"
      );
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    const { password: _, ...rest } = user;

    return rest;
  };
}
