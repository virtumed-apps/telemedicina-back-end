import Joi from 'joi';

export const postSchema = Joi.object({
  dias_semana: Joi.array().required(),
  id_usuario: Joi.number().required(),
  horario_inicial: Joi.string().required(),
  horario_final: Joi.string().required(),
  data_limite: Joi.string().required(),
});

export const patchSchema = Joi.object({
  dias_semana: Joi.array().required(),
  id_usuario: Joi.number().required(),
  horario_inicial: Joi.string().required(),
  horario_final: Joi.string().required(),
  data_limite: Joi.string().required(),
});
