import {
  CreateUserDTO,
  PresentationUserDTO,
  UpdateUserDTO,
} from "../dtos/user.dto";

export interface UserRepository {
  init(): Promise<void>;
  findByEmail: (email: string) => Promise<PresentationUserDTO | undefined>;
  findById: (id: number) => Promise<PresentationUserDTO | undefined>;
  findAll: () => Promise<PresentationUserDTO[]>;
  create: (user: CreateUserDTO) => Promise<PresentationUserDTO>;
  update: (id: number, user: UpdateUserDTO) => Promise<PresentationUserDTO>;
  delete: (id: number) => Promise<void>;
}
