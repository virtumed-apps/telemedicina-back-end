import Joi from 'joi';

export const postSchema = Joi.object({
  id_conselho: Joi.number().required(),
  id_usuario: Joi.number().required(),
  numero: Joi.string().required(),
});

export const patchSchema = Joi.object({
  id_conselho: Joi.number(),
  id_usuario: Joi.number(),
  numero: Joi.string(),
});
