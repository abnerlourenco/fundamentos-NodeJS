import { Router } from 'express';

import createSpecificationController from '../modules/cars/useCases/createSpecification';
import listSpecificationsController from '../modules/cars/useCases/listSpecifications';

const specificationsRoutes = Router();

specificationsRoutes.post('/', async (request, response) => {
  return await createSpecificationController().handle(request, response);
});

specificationsRoutes.get('/', async (request, response) => {
  return await listSpecificationsController().handle(request, response);
});

export { specificationsRoutes };
