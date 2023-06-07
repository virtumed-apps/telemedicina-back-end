import { Router } from 'express';
import horariosFolgas from '../app/controllers/horariosFolgas';
import validator from '../app/middlewares/validator';
import {
  postSchema,
  patchSchema,
} from '../schemas/horariosFolgas';

const route = Router();

route.get('/:id', horariosFolgas.getHorariosFolga);
route.get('/', horariosFolgas.getHorariosFolgas);
route.post('/', validator(postSchema), horariosFolgas.createHorariosFolga);
route.patch('/:id', validator(patchSchema), horariosFolgas.updateHorariosFolga);
route.delete('/:id', horariosFolgas.deleteHorariosFolga);

export default route;
