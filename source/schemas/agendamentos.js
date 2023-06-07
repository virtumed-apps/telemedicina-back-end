import Joi from 'joi';

export const postSchema = Joi.object({
  data_hora: Joi.string().required(),
  id_consulta: Joi.string().required(),
  id_convenio: Joi.number(),
  id_especialidade: Joi.number().required(),
  id_paciente: Joi.number().required(),
  id_profissional: Joi.number().required(),
  id_usuario_atualizacao: Joi.number(),
  ocorrencia: Joi.string(),
  status: Joi.any(),
  tipo: Joi.string().required(),
  multiplos_usuarios: Joi.boolean(),
  payment: Joi.boolean(),
  presencial: Joi.boolean(),
});

export const patchSchema = Joi.object({
  data_hora: Joi.string(),
  id_consulta: Joi.string(),
  id_convenio: Joi.number(),
  id_especialidade: Joi.number(),
  id_paciente: Joi.number(),
  id_profissional: Joi.number(),
  id_usuario_atualizacao: Joi.number(),
  ocorrencia: Joi.string(),
  status: Joi.any(),
  tipo: Joi.string(),
  multiplos_usuarios: Joi.boolean(),
  presencial: Joi.boolean(),
});
