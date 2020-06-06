import express from 'express';
import PointsController from './controllers/PointsController';
import ImtensController from './controllers/ItemsController';
import multer from 'multer';
import multerConfig from './config/multer';



const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const imtensController = new ImtensController();

routes.get('/items', imtensController.index);

routes.post('/points', upload.single('image'), pointsController.create);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);


export default routes;