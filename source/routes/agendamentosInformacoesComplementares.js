import { Router } from 'express';
import agendamentosInformacoesComplementares from '../app/controllers/agendamentosInformacoesComplementares';
import validator from '../app/middlewares/validator';
import {
  postSchema,
  patchSchema,
} from '../schemas/agendamentosInformacoesComplementares';

const route = Router();

route.get('/:id', agendamentosInformacoesComplementares.getInformacao);
route.get('/', agendamentosInformacoesComplementares.getInformacoes);
route.post('/', validator(postSchema), agendamentosInformacoesComplementares.createInformacao);
route.patch('/:id', validator(patchSchema), agendamentosInformacoesComplementares.updateInformacao);
route.delete('/:id', agendamentosInformacoesComplementares.deleteInformacao);

route.get('/arquivos/usuario/:id', agendamentosInformacoesComplementares.getListFiles);

export default route;
