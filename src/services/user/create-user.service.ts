import { Role } from "../../@types/role";
import { BadRequestException } from "../../core/error/exceptions/bad-request.exception";
import { ForbiddenException } from "../../core/error/exceptions/forbidden.exception";
import { CreateUserDTO } from "../../dtos/user.dto";

import { UserRepository } from "../../repository/user.repository";
import bycript from "bcrypt";

export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  execute = async (dto: CreateUserDTO) => {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (dto.role === Role.ADMIN) {
      throw new ForbiddenException(
        "Você não tem permissão para criar um admin"
      );
    }

    if (existingUser) {
      throw new BadRequestException("Usuário já existe");
    }

    const { password, ...rest } = dto;

    const hashedPassword = await bycript.hash(password, 10);

    const payload: CreateUserDTO = {
      ...rest,
      password: hashedPassword,
    };

    const createdUser = await this.userRepository.create(payload);

    return createdUser;
  };
}
