import { Category } from '../../model/Category'
import { type ICreateCategoryDTO, type ICategoryRepository } from '../ICategoriesRepository'

class PostgresCategoriesRepository implements ICategoryRepository {
  private readonly categories: Category[]

  constructor () {
    this.categories = []
  }

  findByName (name: string): Category | undefined {
    const category = this.categories.find((category) => category.name === name)
    return category
  }

  list (): Category[] {
    return this.categories
  }

  create ({ name, description }: ICreateCategoryDTO): void {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    })

    this.categories.push(category)
  }
}

export { PostgresCategoriesRepository }
