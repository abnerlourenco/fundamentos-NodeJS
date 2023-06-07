import { type Request, type Response } from 'express';

import { type ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor (private readonly listCategoryUseCase: ListCategoriesUseCase) {}
  handle (request: Request, response: Response): Response {
    const all = this.listCategoryUseCase.execute();

    return response.status(200).json(all);
  }
}

export { ListCategoriesController };
