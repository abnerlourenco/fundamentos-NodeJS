import { type Request, type Response } from 'express';

import { type ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor (private readonly listCategoryUseCase: ListCategoriesUseCase) {}
  async handle (request: Request, response: Response): Promise<Response> {
    try {
      const all = await this.listCategoryUseCase.execute();

      return response.status(200).json(all);
    } catch (error) {
      return response.status(404).json({ error: error.message });
    }
  }
}

export { ListCategoriesController };
