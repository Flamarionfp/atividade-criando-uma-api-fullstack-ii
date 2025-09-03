export interface ProductDTO {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export type FilterProductsDTO = Partial<
  Pick<ProductDTO, "name" | "price" | "quantity">
>;

export type CreateProductDTO = Omit<ProductDTO, "id">;

export type UpdateProductDTO = Partial<CreateProductDTO>;
