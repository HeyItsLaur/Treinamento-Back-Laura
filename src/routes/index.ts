import { application, Router } from 'express';
import { uuid } from 'uuidv4';
import piuRoutes from './pius.routes';
import userRoutes from './user.routes';

const routes = Router();

routes.use(userRoutes);
routes.use(piuRoutes);


export default routes;