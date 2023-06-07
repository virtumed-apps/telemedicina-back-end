import Joi from 'joi';

export const postSchema = Joi.object({
  id_agendamento: Joi.number(),
  id_usuario: Joi.number(),
  informacao: Joi.string().allow(''),
  tipo: Joi.string().valid('cancelamento', 'nota_clinica').required(),
});

export const patchSchema = Joi.object({
  id_agendamento: Joi.number(),
  id_usuario: Joi.number(),
  informacao: Joi.string(),
  tipo: Joi.string().valid('cancelamento', 'nota_clinica'),
});
