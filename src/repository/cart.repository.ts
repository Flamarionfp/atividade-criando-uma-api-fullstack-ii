import { CartDTO } from "../dtos/cart.dto";

export interface CartRepository {
  init(): Promise<void>;
  find: (id: number) => Promise<CartDTO | undefined>;
  findByUserId: (userId: number) => Promise<CartDTO[]>;
  findItemByProductAndUser: (
    productId: number,
    userId: number
  ) => Promise<CartDTO[]>;
  add: (productId: number, userId: number) => Promise<void>;
  remove: (id: number, userId: number) => Promise<void>;
  clear: (userId: number) => Promise<void>;
}
