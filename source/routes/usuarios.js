import { Router } from 'express';
import usuarios from '../app/controllers/usuarios';
import validator from '../app/middlewares/validator';
import {
  postSchema,
} from '../schemas/usuarios';

const route = Router();

route.get('/:id', usuarios.getUsuario);
route.post('/get-by-field', usuarios.getUsuarioByField);
route.get('/', usuarios.getUsuarios);
route.post('/', validator(postSchema), usuarios.createUsuario);
route.patch('/:id', usuarios.updateUsuario);
route.delete('/:id', usuarios.deleteUsuario);
route.get('/action/filter', usuarios.getUsuariosFilter);

export default route;
