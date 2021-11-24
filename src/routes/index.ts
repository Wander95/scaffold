import { Router } from 'express'
import TestDataRoute from './test-data.routes';

const RootRouter = Router();
RootRouter.use(TestDataRoute.generateRoutes());


export default RootRouter;