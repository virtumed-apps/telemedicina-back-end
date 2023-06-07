import Joi from 'joi';

export const postSchema = Joi.object({
  id_especialidade: Joi.number().required(),
  id_usuario: Joi.number().required(),
  valor_consulta: Joi.number().required(),
  duracao: Joi.number().required(),
  split_valor: Joi.number()
});

export const patchSchema = Joi.object({
  id_especialidade: Joi.number(),
  id_usuario: Joi.number(),
  valor_consulta: Joi.number(),
  duracao: Joi.number(),
  split_valor: Joi.number()
});
