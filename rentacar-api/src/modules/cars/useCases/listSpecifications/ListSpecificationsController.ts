import { type Request, type Response } from 'express'

import { type ListSpecificationsUseCase } from './ListSpecificationsUseCase'

class ListSpecificationsController {
  constructor (private readonly listSpecificationsUseCase: ListSpecificationsUseCase) {}

  handle (request: Request, response: Response): Response {
    const all = this.listSpecificationsUseCase.execute()

    return response.status(200).json(all)
  }
}

export { ListSpecificationsController }
