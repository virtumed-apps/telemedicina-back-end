import Joi from 'joi';

export const postSchema = Joi.object({
  chave: Joi.string().required(),
  data_hora_expiracao: Joi.string().required(),
  id_usuario: Joi.number().required(),
  token: Joi.string().required(),
  valor: Joi.string().required(),
});

export const patchSchema = Joi.object({
  chave: Joi.string(),
  data_hora_expiracao: Joi.string(),
  id_usuario: Joi.number(),
  token: Joi.string(),
  valor: Joi.string(),
});
