import { Router } from 'express';
import usuariosIntegracoes from '../app/controllers/usuariosIntegracoes';
import validator from '../app/middlewares/validator';
import { postSchema, patchSchema } from '../schemas/usuariosIntegracoes';

const route = Router();

route.get('/:id', usuariosIntegracoes.getUsuarioIntegracao);
route.get('/', usuariosIntegracoes.getUsuarioIntegracaoById);
// route.get('/', usuariosIntegracoes.getUsuariosIntegracoes);
route.post('/', validator(postSchema), usuariosIntegracoes.createUsuarioIntegracao);
route.patch('/:id', validator(patchSchema), usuariosIntegracoes.updateUsuarioIntegracao);
route.delete('/:id', usuariosIntegracoes.deleteUsuarioIntegracao);

export default route;
