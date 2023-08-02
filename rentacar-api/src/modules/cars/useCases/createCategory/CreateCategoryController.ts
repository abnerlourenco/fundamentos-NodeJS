import { type Request, type Response } from 'express';

import { type CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  constructor (private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      await this.createCategoryUseCase.execute({ name, description });
      return response.status(201).send();
    } catch (error) {
      return response.status(404).json({ error: error.message });
    }
  }
}

export { CreateCategoryController };
