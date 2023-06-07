import { Router } from 'express';
import agendamentosIntegracoes from '../app/controllers/agendamentosIntegracoes';
import validator from '../app/middlewares/validator';
import {
  postSchema,
  patchSchema,
} from '../schemas/agendamentosIntegracoes';

const route = Router();

route.get('/:id', agendamentosIntegracoes.getIntegracao);
route.get('/', agendamentosIntegracoes.getIntegracoes);
route.post('/', validator(postSchema), agendamentosIntegracoes.createIntegracao);
route.patch('/:id', validator(patchSchema), agendamentosIntegracoes.updateIntegracao);
route.delete('/:id', agendamentosIntegracoes.deleteIntegracao);

export default route;
