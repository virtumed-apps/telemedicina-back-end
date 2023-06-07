import { Router } from 'express';
import agendamentos from '../app/controllers/agendamentos';

const route = Router();

route.get('/:id', agendamentos.getInformacoesAtendimento);

export default route;
