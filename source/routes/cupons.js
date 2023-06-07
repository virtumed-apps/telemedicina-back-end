import { Router } from 'express';
import cupons from '../app/controllers/cupons';
import validator from '../app/middlewares/validator';
import {
  postSchema,
  patchSchema,
} from '../schemas/cupons';

const route = Router();

route.get('/:id', cupons.getCupom);
route.get('/', cupons.getCupons);
route.post('/', validator(postSchema), cupons.createCupom);
route.patch('/:id', validator(patchSchema), cupons.updateCupom);
route.delete('/:id', cupons.deleteCupom);
route.get('/validate/:cupom', cupons.validateCoupon);

export default route;
