import { type Specification } from '../../entities/Specification';
import { type ISpecificationRepository } from '../../repositories/ISpecificationsRepository';

class ListSpecificationsUseCase {
  constructor (private readonly specificationRepository: ISpecificationRepository) {}

  async execute (): Promise<Specification[]> {
    const specification = await this.specificationRepository.list();

    return specification;
  }
}

export { ListSpecificationsUseCase };
