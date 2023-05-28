/* eslint-disable @typescript-eslint/method-signature-style */
import { type Specification } from '../model/Specification'

interface ICreateSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationRepository {
  findByName(name: string): Specification | undefined
  create({ name, description }: ICreateSpecificationDTO): void
}

export type { ICreateSpecificationDTO, ISpecificationRepository }
