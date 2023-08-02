import { Router } from 'express';
import Multer from 'multer';

import createCategoryController from '../modules/cars/useCases/createCategory';
import importCategoriesController from '../modules/cars/useCases/importCategories';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

const upload = Multer({
  dest: './tmp'
});

categoriesRoutes.post('/', async (request, response) => {
  return await createCategoryController().handle(request, response);
});

categoriesRoutes.get('/', async (request, response) => {
  return await listCategoriesController().handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), async (request, response) => {
  return await importCategoriesController().handle(request, response);
});

export { categoriesRoutes };
