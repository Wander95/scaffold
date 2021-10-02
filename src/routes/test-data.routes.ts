import { Router } from "express";

class TestDataRoute {
  private router: Router;

  constructor(){
    this.router = Router()
  }

  initRoutes(){
    this.router.get('/test-data')
    this.router.get('/test-data/:testDataId')
    this.router.post('/test-data')
    this.router.put('/test-data/:testDataId')
    this.router.delete('/test-data/:testDataId')
  }
}

export default TestDataRoute;