import Joi from 'joi';

export const postSchema = Joi.object({
  nome: Joi.string().required(),
});

export const patchSchema = Joi.object({
  nome: Joi.string(),
});
