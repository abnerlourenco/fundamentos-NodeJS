import { type Specification } from '../../entities/Specification';
import { type ISpecificationRepository } from '../../repositories/ISpecificationsRepository';

class ListSpecificationsUseCase {
  constructor (private readonly specificationRepository: ISpecificationRepository) {}

  execute (): Specification[] {
    const specification = this.specificationRepository.list();

    return specification;
  }
}

export { ListSpecificationsUseCase };
