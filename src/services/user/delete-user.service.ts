import { NotFoundException } from "../../core/error/exceptions/not-found.exception";
import { UserRepository } from "../../repository/user.repository";

export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  execute = async (id: number) => {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundException("Usuário não encontrado");
    }

    await this.userRepository.delete(id);
  };
}
