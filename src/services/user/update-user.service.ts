import { NotFoundException } from "../../core/error/exceptions/not-found.exception";
import { UnauthorizedException } from "../../core/error/exceptions/unauthorized.exception";
import { AuthenticatedUserDTO, UpdateUserDTO } from "../../dtos/user.dto";
import { UserRepository } from "../../repository/user.repository";

export class UpdateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  execute = async (
    id: number,
    dto: UpdateUserDTO,
    authenticatedUser: AuthenticatedUserDTO
  ) => {
    const { requesterId } = authenticatedUser;

    if (id !== requesterId) {
      throw new UnauthorizedException(
        "Você não tem permissão para atualizar esse usuário"
      );
    }

    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundException("Usuário não encontrado");
    }

    if (dto.email && dto.email !== existingUser.email) {
      const userWithNewEmail = await this.userRepository.findByEmail(dto.email);

      if (userWithNewEmail) {
        throw new NotFoundException("Já existe um usuário com esse email");
      }
    }

    const updatedUser = await this.userRepository.update(id, dto);

    return updatedUser;
  };
}
