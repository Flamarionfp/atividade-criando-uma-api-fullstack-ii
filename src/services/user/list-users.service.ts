import { UserRepository } from "../../repository/user.repository";

export class ListUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  execute = async () => {
    const users = await this.userRepository.findAll();

    return users;
  };
}
