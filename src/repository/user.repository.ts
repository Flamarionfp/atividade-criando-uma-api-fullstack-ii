import {
  CreateUserDTO,
  PresentationUserDTO,
  UpdateUserDTO,
  UserDTO,
} from "../dtos/user.dto";

export interface UserRepository {
  init(): Promise<void>;
  findByEmail: (email: string) => Promise<UserDTO | undefined>;
  findById: (id: number) => Promise<UserDTO | undefined>;
  findAll: () => Promise<PresentationUserDTO[]>;
  create: (user: CreateUserDTO) => Promise<PresentationUserDTO>;
  update: (id: number, user: UpdateUserDTO) => Promise<PresentationUserDTO>;
  delete: (id: number) => Promise<void>;
}
