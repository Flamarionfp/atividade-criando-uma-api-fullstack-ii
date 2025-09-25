import { CartDTO } from "../dtos/cart.dto";

export interface CartRepository {
  init(): Promise<void>;
  add: (productId: number, userId: number) => Promise<void>;
  findByUserId: (userId: number) => Promise<CartDTO[]>;
}
