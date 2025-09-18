import { UnauthorizedException } from "../../core/error/exceptions/unauthorized.exception";
import { AuthDTO } from "../../dtos/auth.dto";
import bycript from "bcrypt";
import { UserRepository } from "../../repository/user.repository";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  private static DEFAULT_ERROR_MESSAGE = "Login inválido";

  execute = async (dto: AuthDTO) => {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException(AuthService.DEFAULT_ERROR_MESSAGE);
    }

    const isValidPassword = await bycript.compare(dto.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(AuthService.DEFAULT_ERROR_MESSAGE);
    }

    const secret = process.env.JWT_SECRET ?? "";

    const { password: _, ...rest } = user;

    const token = jwt.sign(rest, secret, {
      expiresIn: "1h",
    });

    return {
      token,
    };
  };
}
