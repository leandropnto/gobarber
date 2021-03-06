import { Router } from 'express';
import multer from 'multer';
import authMiddleware from './app/middlewares/auth';
import {
  createUserMiddleware,
  updateUserMiddleare,
} from './app/middlewares/users';

import storeSessionMiddleware from './app/middlewares/sessions';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import { appointmentStoreMiddleware } from './app/middlewares/appointmentsMiddleware';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', createUserMiddleware, UserController.store);
routes.post('/sessions', storeSessionMiddleware, SessionController.store);

/* Protege apenas a rota de atualização */
routes.use(authMiddleware);
routes.put('/users', updateUserMiddleare, UserController.update);
routes.get('/users', updateUserMiddleare, UserController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.post(
  '/appointments',
  appointmentStoreMiddleware,
  AppointmentController.store
);

routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
