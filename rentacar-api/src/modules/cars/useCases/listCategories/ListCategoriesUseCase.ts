import { type Category } from '../../entities/Category';
import { type ICategoryRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  constructor (private readonly categoriesRepository: ICategoryRepository) {}

  async execute (): Promise<Category[]> {
    const categories = this.categoriesRepository.list();

    return await categories;
  }
}

export { ListCategoriesUseCase };
