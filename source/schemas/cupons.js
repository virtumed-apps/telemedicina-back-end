import Joi from 'joi';

export const postSchema = Joi.object({
  cupom: Joi.string().required(),
  desconto: Joi.number().required(),
  expiracao: Joi.date().required(),
  quantidade_maxima_uso: Joi.number().required(),
});

export const patchSchema = Joi.object({
  cupom: Joi.string(),
  desconto: Joi.number(),
  expiracao: Joi.date(),
  quantidade_maxima_uso: Joi.number(),
});
