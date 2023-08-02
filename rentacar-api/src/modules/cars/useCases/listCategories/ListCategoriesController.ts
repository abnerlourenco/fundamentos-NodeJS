import { type Request, type Response } from 'express';

import { type ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor (private readonly listCategoryUseCase: ListCategoriesUseCase) {}
  async handle (request: Request, response: Response): Promise<Response> {
    const all = await this.listCategoryUseCase.execute();

    return response.status(200).json(all);
  }
}

export { ListCategoriesController };
