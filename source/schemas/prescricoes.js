import Joi from 'joi';

export const postSchema = Joi.object({
  id_prescricao_integracao: Joi.number(),
  id_paciente: Joi.number(),
  id_profissional: Joi.number(),
  id_agendamento: Joi.number(),
});

// export const patchSchema = Joi.object({
//   id_prescricao_integracao: Joi.number(),
// });
