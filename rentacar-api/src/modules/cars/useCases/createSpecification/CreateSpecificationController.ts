import { type Request, type Response } from 'express';

import { type CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  constructor (private readonly createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle (request: Request, response: Response): Response {
    try {
      const { name, description } = request.body;

      this.createSpecificationUseCase.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(404).json({ error: error.message });
    }
  }
}

export { CreateSpecificationController };
