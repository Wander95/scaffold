import TestDataController from "../controllers/test-data.controller";
import { Router } from "express";
import ValidationMiddleware from '../middlewares/validation.middleware';
import TestDataSchema from  '../validators/test-data.validators';

interface BaseRoute {
  readonly router: Router;
  generateRoutes():Router
}

class TestDataRoute extends ValidationMiddleware implements BaseRoute{
  readonly router: Router;

  constructor(){
    super()
    this.router = Router();
  }

  initRoutes():void {
    this.router.get('/test-data',TestDataController.getAllTestData)
    this.router.get('/test-data/:testDataId',this.validateParams,TestDataController.getOneTestData)
    this.router.post('/test-data',this.validateBody(TestDataSchema.getSchema('POST')),TestDataController.postOneTestData)
    this.router.put('/test-data/:testDataId',this.validateBody(TestDataSchema.getSchema('PUT')),this.validateParams,TestDataController.putOneTestData)
    this.router.delete('/test-data/:testDataId',this.validateParams,TestDataController.deleteOneTestData)
  }

  generateRoutes():Router {
    this.initRoutes()
    return this.router;
  }
}

export default new TestDataRoute();