import Joi from 'joi';

export const postSchema = Joi.object({
  id_paciente: Joi.number(),
  id_profissional: Joi.number(),
  status: Joi.string(),
});

export const patchSchema = Joi.object({
  id_paciente: Joi.number(),
  id_profissional: Joi.number(),
  status: Joi.string(),
});
