import { BadRequestException } from "../../core/error/exceptions/bad-request.exception";
import { CreateUserDTO } from "../../dtos/user.dto";
import { UserRepository } from "../../repository/user.repository";

export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  execute = async (dto: CreateUserDTO) => {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException("Usuário já existe");
    }

    const createdUser = await this.userRepository.create(dto);

    return createdUser;
  };
}
