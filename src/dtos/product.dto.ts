export interface ProductDTO {
  id: number;
  name: string;
  price: number;
  trade: string;
  model: string;
  year: string;
  specifications: string[];
  thumb: string;
}

export type FilterProductsDTO = Partial<Pick<ProductDTO, "name" | "price">>;

export type CreateProductDTO = Omit<ProductDTO, "id">;

export type UpdateProductDTO = Partial<CreateProductDTO>;
