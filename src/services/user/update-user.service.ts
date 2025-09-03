import { NotFoundException } from "../../core/error/exceptions/not-found.exception";
import { UpdateUserDTO } from "../../dtos/user.dto";
import { UserRepository } from "../../repository/user.repository";

export class UpdateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  execute = async (id: number, dto: UpdateUserDTO) => {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundException("Usuário não encontrado");
    }

    if (dto.email && dto.name !== existingUser.email) {
      const userWithNewEmail = await this.userRepository.findByEmail(dto.email);

      if (userWithNewEmail) {
        throw new NotFoundException("Já existe um usuário com esse email");
      }
    }

    const updatedUser = await this.userRepository.update(id, dto);

    return updatedUser;
  };
}
