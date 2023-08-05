import { type Request, type Response } from 'express';

import { type ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsController {
  constructor (private readonly listSpecificationsUseCase: ListSpecificationsUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const all = await this.listSpecificationsUseCase.execute();

    return response.status(200).json(all);
  }
}

export { ListSpecificationsController };
