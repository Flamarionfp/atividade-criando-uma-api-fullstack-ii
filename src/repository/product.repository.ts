import {
  CreateProductDTO,
  FilterProductsDTO,
  ProductDTO,
  UpdateProductDTO,
} from "../dtos/product.dto";

export interface ProductRepository {
  init(): Promise<void>;
  findByName: (name: string) => Promise<ProductDTO | undefined>;
  findById: (id: number) => Promise<ProductDTO | undefined>;
  findAll: (filters?: FilterProductsDTO) => Promise<ProductDTO[]>;
  create: (product: CreateProductDTO) => Promise<ProductDTO>;
  update: (id: number, product: UpdateProductDTO) => Promise<ProductDTO>;
  delete: (id: number) => Promise<void>;
}
