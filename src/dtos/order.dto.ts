export interface OrderItemDTO {
  id: number;
  productId: number;
  productName: string;
  price: number;
}

export interface OrderDTO {
  id: number;
  userId: number;
  totalAmount: number;
  createdAt: string;
  items: OrderItemDTO[];
}

export interface OrderSummaryDTO {
  id: number;
  totalAmount: number;
  createdAt: string;
}

export type CreateOrderDTO = Omit<OrderDTO, "id" | "createdAt" | "items"> & {
  items: Omit<OrderItemDTO, "id">[];
};
