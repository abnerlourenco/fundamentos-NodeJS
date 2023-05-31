import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import { CreateCategoryController } from './CreateCategoryController'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

const categotiesRepository = CategoriesRepository.getInstance()
const createCategoryUseCase = new CreateCategoryUseCase(categotiesRepository)

const createCategoryController = new CreateCategoryController(createCategoryUseCase)

export { createCategoryController }
