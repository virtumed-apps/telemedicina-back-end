import { Router } from 'express';
import usuariosConvenios from '../app/controllers/usuariosConvenios';
import validator from '../app/middlewares/validator';
import { postSchema, patchSchema } from '../schemas/usuariosConvenios';

const route = Router();

route.get('/:id', usuariosConvenios.getUsuarioConvenio);
route.get('/', usuariosConvenios.getUsuarioConvenios);
route.post('/', validator(postSchema), usuariosConvenios.createUsuarioConvenio);
route.patch('/:id', validator(patchSchema), usuariosConvenios.updateUsuarioConvenio);
route.delete('/:id', usuariosConvenios.deleteUsuarioConvenio);

export default route;
