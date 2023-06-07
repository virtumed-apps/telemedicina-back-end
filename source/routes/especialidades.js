import { Router } from 'express';
import especialidades from '../app/controllers/especialidades';
import validator from '../app/middlewares/validator';
import {
  postSchema,
  patchSchema,
} from '../schemas/especialidades';

const route = Router();

route.get('/:id', especialidades.getEspecialidade);
route.get('/', especialidades.getEspecialidades);
route.post('/', validator(postSchema), especialidades.createEspecialidade);
route.patch('/:id', validator(patchSchema), especialidades.updateEspecialidade);
route.delete('/:id', especialidades.deleteEspecialidade);

export default route;
