import { Router } from 'express';
import agendamentos from '../app/controllers/agendamentos';
import validator from '../app/middlewares/validator';
import {
  postSchema,
  patchSchema,
} from '../schemas/agendamentos';

const route = Router();

route.get('/:id', agendamentos.getAgendamento);
route.get('/', agendamentos.getAgendamentos);
route.post('/', validator(postSchema), agendamentos.createAgendamento);
route.patch('/:id', validator(patchSchema), agendamentos.updateAgendamento);
route.delete('/:id', agendamentos.deleteAgendamento);
route.get('/hash/:id', agendamentos.getUserInAgendamentoByHash)

export default route;
