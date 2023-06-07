import { Router } from 'express';
import prescricoes from '../app/controllers/prescricoes';
import validator from '../app/middlewares/validator';
import {
  postSchema,
  // patchSchema,
} from '../schemas/prescricoes';

const route = Router();

route.get('/:id', prescricoes.getPrescricao);
route.get('/', prescricoes.getPrescricoes);
route.post('/', validator(postSchema), prescricoes.createPrescricao);
// route.patch('/:id', validator(patchSchema), prescricoes.updatePrescricao);
route.delete('/:id', prescricoes.deletePrescricao);

export default route;
