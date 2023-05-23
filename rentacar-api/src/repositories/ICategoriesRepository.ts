/* eslint-disable @typescript-eslint/method-signature-style */
import { type Category } from '../model/Category'

interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICategoryRepository {
  findByName(name: string): Category | undefined
  list(): Category[]
  create({ name, description }: ICreateCategoryDTO): void
}

export type { ICreateCategoryDTO, ICategoryRepository }
