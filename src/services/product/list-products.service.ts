import { FilterProductsDTO } from "../../dtos/product.dto";
import { ProductRepository } from "../../repository/product.repository";

export class ListProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  execute = async (dto: FilterProductsDTO) => {
    const products = await this.productRepository.findAll(dto);

    return products;
  };
}
