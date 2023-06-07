import Joi from 'joi';

export const postSchema = Joi.object({
  id_integracao: Joi.number().required(),
  id_usuario: Joi.number().required(),
  valor: Joi.string().required(),
});

export const patchSchema = Joi.object({
  id_integracao: Joi.number(),
  id_usuario: Joi.number(),
  valor: Joi.string(),
});
