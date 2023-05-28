import { type ISpecificationRepository } from '../repositories/ISpecificationsRepository'

interface IRequest {
  name: string
  description: string
}
class CreateSpecificationService {
  constructor (private readonly specificationsRepository: ISpecificationRepository) {}

  execute ({ description, name }: IRequest): void {
    const specificationAlreadyExists = this.specificationsRepository.findByName(name)

    if (specificationAlreadyExists != null) {
      throw new Error('Specification already exists')
    }
    this.specificationsRepository.create({
      name,
      description
    })
  }
}

export { CreateSpecificationService }
