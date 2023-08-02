import { type ICategoryRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string
  description: string
}

class CreateCategoryUseCase {
  constructor (private readonly categoriesRepository: ICategoryRepository) {}

  async execute ({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists != null) {
      throw new Error('Category already exists');
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
