import { Router } from 'express';
import memed from '../app/controllers/memed';

const route = Router();

route.post('/usuario', memed.integrarUsuarioMemed);
route.get('/usuario/:id', memed.obterUsuario);
route.get('/prescricao/:id', memed.obterPrescricaoMemed);

export default route;
