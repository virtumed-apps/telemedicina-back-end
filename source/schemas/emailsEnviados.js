import Joi from 'joi';

export const postSchema = Joi.object({
  corpo: Joi.string().required(),
  destinatario: Joi.string().required(),
  remetente: Joi.string().required(),
  tipo: Joi.string().required(),
  id_agendamento: Joi.string(),
});

export const patchSchema = Joi.object({
  corpo: Joi.string().required(),
  destinatario: Joi.string().required(),
  remetente: Joi.string().required(),
  tipo: Joi.string().required(),
  id_agendamento: Joi.string(),
});
