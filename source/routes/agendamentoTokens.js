import { Router } from 'express';
import agendamentosToken from '../app/controllers/agendamentosToken';
import validator from '../app/middlewares/validator';
import {
  postSchema,
  patchSchema,
} from '../schemas/agendamentosToken';

const route = Router();

route.get('/:id', agendamentosToken.createAgendamentoToken);
route.get('/', agendamentosToken.getAgendamentoTokens);
route.get('/validate/:token', agendamentosToken.validateScheduleToken);
route.post('/multiplos', validator(postSchema), agendamentosToken.generateScheduleTokens);
route.patch('/:id', validator(patchSchema), agendamentosToken.updateAgendamentoToken);
route.delete('/:id', agendamentosToken.deleteAgendamentoToken);

export default route;
