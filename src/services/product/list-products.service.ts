import { PaginationParams } from "../../@types/pagination";
import { ProductQueryDTO } from "../../dtos/product.dto";
import { ProductRepository } from "../../repository/product.repository";

export class ListProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  execute = async (dto: ProductQueryDTO) => {
    const { limit, page, ...rest } = dto;

    const products = await this.productRepository.findAll(rest, {
      limit,
      page,
    });

    return products;
  };
}
