import Joi from 'joi';

export const postSchema = Joi.object({
    nome: Joi.string().required(),
    permite_convenio: Joi.boolean().required(),
    permite_particular: Joi.boolean().required(),
    permite_publico: Joi.boolean().required(),
    valor_consulta: Joi.number().required(),
    descricao: Joi.string(),
    url_imagem: Joi.string(),
    duracao_consulta: Joi.number().required(),
});

export const patchSchema = Joi.object({
    nome: Joi.string(),
    permite_convenio: Joi.boolean(),
    permite_particular: Joi.boolean(),
    permite_publico: Joi.boolean(),
});
