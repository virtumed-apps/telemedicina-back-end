import { Router } from 'express';
import usuariosConselhos from '../app/controllers/usuariosConselhos';
import validator from '../app/middlewares/validator';
import { postSchema, patchSchema } from '../schemas/usuariosConselhos';

const route = Router();

route.get('/:id', usuariosConselhos.getUsuarioConselho);
route.get('/', usuariosConselhos.getUsuariosConselhos);
route.post('/', validator(postSchema), usuariosConselhos.createUsuarioConselho);
route.patch(
  '/:id',
  validator(patchSchema),
  usuariosConselhos.updateUsuarioConselho,
);
route.delete('/:id', usuariosConselhos.deleteUsuarioConselho);

export default route;
