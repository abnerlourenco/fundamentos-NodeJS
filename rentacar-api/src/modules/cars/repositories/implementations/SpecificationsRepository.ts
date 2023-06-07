import { Specification } from '../../model/Specification';
import { type ISpecificationRepository, type ICreateSpecificationDTO } from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationRepository {
  private readonly specification: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor () {
    this.specification = [];
  }

  public static getInstance (): SpecificationsRepository {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }

  create ({ description, name }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date()
    });

    this.specification.push(specification);
  }

  list (): Specification[] {
    return this.specification;
  }

  findByName (name: string): Specification | undefined {
    const specification = this.specification.find((specification) => specification.name === name);
    return specification;
  }
}

export { SpecificationsRepository };
