import Joi from 'joi';

export const postSchema = Joi.object({
  id_usuario: Joi.number(),
});

export const patchSchema = Joi.object({
  id_usuario: Joi.number(),
});
