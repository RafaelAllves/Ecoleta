import express, { request, response } from 'express';
import PointsController from './controllers/PointsController';
import ImtensController from './controllers/ItemsController';



const routes = express.Router();
const pointsController = new PointsController();
const imtensController = new ImtensController();

routes.get('/items', imtensController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);


export default routes;