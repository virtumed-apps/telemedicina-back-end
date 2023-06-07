import { Router } from 'express';
import usuariosRecuperacoesSenhas from '../app/controllers/usuariosRecuperacoesSenhas';
import validator from '../app/middlewares/validator';
import { postSchema, patchSchema } from '../schemas/usuariosRecuperacoesSenha';

const route = Router();

route.get('/:id', usuariosRecuperacoesSenhas.getUsuarioRecuperacaoSenha);
route.get('/', usuariosRecuperacoesSenhas.getUsuariosRecuperacoesSenhas);
route.post('/', validator(postSchema), usuariosRecuperacoesSenhas.createUsuarioRecuperacaoSenha);
route.patch('/:id', validator(patchSchema), usuariosRecuperacoesSenhas.updateUsuarioRecuperacaoSenha);
route.delete('/:id', usuariosRecuperacoesSenhas.deleteUsuarioRecuperacaoSenha);

export default route;
