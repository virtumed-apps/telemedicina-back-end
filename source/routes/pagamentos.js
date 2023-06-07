import { Router } from 'express';
import pagamentos from '../app/controllers/pagamentos';

const route = Router();

route.post('/agendamento/contself', pagamentos.pagamentoAgendamentoContself);

export default route;
