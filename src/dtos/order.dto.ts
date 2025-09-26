export interface OrderDTO {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  createdDate: Date;
  submittedDate: Date;
}
