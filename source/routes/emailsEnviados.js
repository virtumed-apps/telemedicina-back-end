import { Router } from 'express';
import emailsEnviados from '../app/controllers/emails_enviados';
import validator from '../app/middlewares/validator';
import {
  postSchema,
  patchSchema,
} from '../schemas/emailsEnviados';

const route = Router();

route.get('/:id', emailsEnviados.getEmailEnviado);
route.get('/', emailsEnviados.getEmailsEnviados);
route.post('/', validator(postSchema), emailsEnviados.createEmailEnviado);
route.patch('/:id', validator(patchSchema), emailsEnviados.updateEmailEnviado);
route.delete('/:id', emailsEnviados.deleteEmailEnviado);

export default route;
