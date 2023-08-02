import { type Request, type Response } from 'express';

import { type ImportCategoriesUseCase } from './ImportCategoriesUseCase';

class ImportCategoriesController {
  constructor (private readonly importCategoriesUseCase: ImportCategoriesUseCase) {}
  async handle (request: Request, response: Response): Promise<Response> {
    const { file } = request;

    if (!file) {
      return response.status(400).json({ message: 'Bad Request - file not found' });
    }

    await this.importCategoriesUseCase.execute(file);
    return response.send();
  }
}

export { ImportCategoriesController };
