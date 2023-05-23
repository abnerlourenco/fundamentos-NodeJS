import { Specification } from '../model/Specification'
import { type ISpecificationRepository, type ICreateSpecificationDTO } from './ISpecificationsRepository'

class SpecificationRepository implements ISpecificationRepository {
  private readonly specification: Specification[]

  constructor () {
    this.specification = []
  }

  create ({ description, name }: ICreateSpecificationDTO): void {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description,
      created_at: new Date()
    })

    this.specification.push(specification)
  }

  list (): Specification[] {
    return this.specification
  }

  findByName (name: string): Specification | undefined {
    const specification = this.specification.find((specification) => specification.name === name)
    return specification
  }
}

export { SpecificationRepository }
