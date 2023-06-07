import { Router } from 'express';
import usuariosEspecialidades from '../app/controllers/usuariosEspecialidades';
import validator from '../app/middlewares/validator';
import { postSchema, patchSchema } from '../schemas/usuariosEspecialidades';

const route = Router();

route.get('/:id', usuariosEspecialidades.getUsuarioEspecialidade);
route.get('/', usuariosEspecialidades.getUsuarioEspecialidades);
route.post('/', validator(postSchema), usuariosEspecialidades.createUsuarioEspecialidade);
route.patch('/:id', validator(patchSchema), usuariosEspecialidades.updateUsuarioEspecialidade);
route.delete('/:id', usuariosEspecialidades.deleteUsuarioEspecialidade);

export default route;
