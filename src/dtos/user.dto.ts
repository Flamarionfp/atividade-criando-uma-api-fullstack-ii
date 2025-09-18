import { Role } from "../@types/role";

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export type PresentationUserDTO = Omit<UserDTO, "password">;

export type CreateUserDTO = Omit<UserDTO, "id">;

export type UpdateUserDTO = Partial<Omit<UserDTO, "password">>;

export interface AuthenticatedUserDTO {
  requesterId: number;
  role: Role;
}
