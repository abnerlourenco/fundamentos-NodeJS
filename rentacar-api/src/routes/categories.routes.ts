import { Router } from 'express';
import Multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import importCategoriesController from '../modules/cars/useCases/importCategories';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

const upload = Multer({
  dest: './tmp'
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', async (request, response) => {
  return await listCategoriesController().handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), async (request, response) => {
  return await importCategoriesController().handle(request, response);
});

export { categoriesRoutes };
