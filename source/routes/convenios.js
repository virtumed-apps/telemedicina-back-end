import { Router } from 'express';
import convenios from '../app/controllers/convenios';
import validator from '../app/middlewares/validator';
import {
  postSchema,
  patchSchema,
} from '../schemas/convenios';

const route = Router();

route.get('/:id', convenios.getConvenio);
route.get('/', convenios.getConvenios);
route.post('/', validator(postSchema), convenios.createConvenio);
route.patch('/:id', validator(patchSchema), convenios.updateConvenio);
route.delete('/:id', convenios.deleteConvenio);

export default route;
