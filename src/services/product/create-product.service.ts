import { BadRequestException } from "../../core/error/exceptions/bad-request.exception";
import { CreateProductDTO, ProductDTO } from "../../dtos/product.dto";
import { ProductRepository } from "../../repository/product.repository";

export class CreateProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  execute = async (dto: CreateProductDTO) => {
    const existingProduct = await this.productRepository.findByName(dto.name);

    if (existingProduct) {
      throw new BadRequestException("Esse produto já existe");
    }

    const createdProduct = await this.productRepository.create(dto);

    return createdProduct;
  };
}
