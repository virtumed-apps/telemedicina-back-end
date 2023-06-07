import { Router } from 'express';
import conselhos from '../app/controllers/conselhos';
import validator from '../app/middlewares/validator';
import {
  postSchema,
  patchSchema,
} from '../schemas/conselhos';

const route = Router();

route.get('/:id', conselhos.getConselho);
route.get('/', conselhos.getConselhos);
route.post('/', validator(postSchema), conselhos.createConselho);
route.patch('/:id', validator(patchSchema), conselhos.updateConselho);
route.delete('/:id', conselhos.deleteConselho);

export default route;
