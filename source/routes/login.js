import { Router } from 'express';
import login from '../app/controllers/login';
import usuarios from '../app/controllers/usuarios';

const route = Router();

route.post('/', login.loginUser);
route.post('/esqueceu-senha', login.forgotPassword);
route.post('/create', usuarios.createUsuario);

export default route;
