import { type Request, type Response } from 'express';

import { type CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  constructor (private readonly createSpecificationUseCase: CreateSpecificationUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      await this.createSpecificationUseCase.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(404).json({ error: error.message });
    }
  }
}

export { CreateSpecificationController };
