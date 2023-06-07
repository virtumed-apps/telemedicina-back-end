import Joi from 'joi';

export const postSchema = Joi.object({
  id_agendamento: Joi.number().required(),
  emails: Joi.array().min(1).required(),
});

export const patchSchema = Joi.object({
  id_agendamento: Joi.number(),
  token: Joi.string(),
  expira: Joi.string(),
});
