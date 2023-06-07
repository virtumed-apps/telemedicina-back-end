import { Router } from 'express';
import usuariosHorarios from '../app/controllers/usuariosHorarios';
import validator from '../app/middlewares/validator';
import { patchSchema, postSchema } from '../schemas/usuariosHorarios';

const route = Router();

route.get('/:id', usuariosHorarios.getUsuarioHorario);
route.get('/horarios-fracionados/:id', usuariosHorarios.getUsuarioHorariosFracionados);
route.get('/', usuariosHorarios.getUsuariosHorarios);
route.get('/agenda/:id', usuariosHorarios.getUsuarioAgenda);
route.post('/', validator(postSchema), usuariosHorarios.createUsuarioHorario);
route.patch(
  '/:id',
  validator(patchSchema),
  usuariosHorarios.updateUsuarioHorario,
);
route.delete('/:id', usuariosHorarios.deleteUsuarioHorario);
route.delete('/horarios-fracionados/:id', usuariosHorarios.deleteUsuarioHorarioFracionado);

export default route;
