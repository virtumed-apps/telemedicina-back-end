import { Router } from 'express';
import agendamentosReservas from '../app/controllers/agendamentosReservas';
import validator from '../app/middlewares/validator';
import {
  postSchema,
  patchSchema,
} from '../schemas/agendamentosReservas';

const route = Router();

route.get('/:id', agendamentosReservas.getReserva);
route.get('/', agendamentosReservas.getReservas);
route.post('/', validator(postSchema), agendamentosReservas.createReserva);
route.patch('/:id', validator(patchSchema), agendamentosReservas.updateReserva);
route.delete('/:id', agendamentosReservas.deleteReserva);

export default route;
