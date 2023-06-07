import { type Request, type Response } from 'express';

import { type ImportCategoriesUseCase } from './ImportCategoriesUseCase';

class ImportCategoriesController {
  constructor (private readonly importCategoriesUseCase: ImportCategoriesUseCase) {}
  handle (request: Request, response: Response): Response {
    const { file } = request;

    if (!file) {
      return response.status(400).json({ message: 'Bad Request - file not found' });
    }

    void this.importCategoriesUseCase.execute(file);
    return response.send();
  }
}

export { ImportCategoriesController };
