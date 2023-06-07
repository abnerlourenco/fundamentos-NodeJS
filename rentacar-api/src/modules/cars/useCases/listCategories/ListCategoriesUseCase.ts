import { type Category } from '../../model/Category';
import { type ICategoryRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  constructor (private readonly categoriesRepository: ICategoryRepository) {}

  execute (): Category[] {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
