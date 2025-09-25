export interface CartRepository {
  init(): Promise<void>;
  add: (productId: number, userId: number) => Promise<void>;
}
