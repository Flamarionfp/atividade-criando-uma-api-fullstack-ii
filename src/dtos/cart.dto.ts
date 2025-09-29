export interface CartDTO {
  id: number;
  userId: number;
  productId: number;
  productName: string;
  productPrice: number;
  productTrade: string;
  productModel: string;
  productYear: string;
  productSpecifications: string[];
  productThumb: string;
}
