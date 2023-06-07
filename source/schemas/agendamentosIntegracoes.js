import Joi from 'joi';

export const postSchema = Joi.object({
  id_agendamento: Joi.number().required(),
  id_integracao: Joi.number().required(),
  valor: Joi.string().required(),
});

export const patchSchema = Joi.object({
  id_agendamento: Joi.number(),
  id_integracao: Joi.number(),
  valor: Joi.string(),
});
