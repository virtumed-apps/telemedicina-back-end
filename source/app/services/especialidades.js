import { QueryTypes } from "sequelize";
import { sequelize, especialidades } from "../models";

async function getEspecialidadesParticular(request) {
  const { id_ambiente } = request;

  return sequelize.query(
    ` select 
    e.nome,
    e.id as id_especialidade,
    MIN(ue.duracao) as duracao_minima,
    MIN(ue.valor_consulta) as valor_minimo,
    e.pre_definido,
    e.valor_consulta,
    e.duracao_consulta
    from especialidades e
    inner join usuarios_especialidades ue
    on e.id = ue.id_especialidade
    where e.id_ambiente = '${id_ambiente}' and e.permite_particular = true
    group by e.id, ue.id_especialidade
    `,
    {
      nest: true,
      type: QueryTypes.SELECT,
    }
  );
}

async function getProfissionais(request) {
  const { id_ambiente, especialidade, ativo } = request;

  return sequelize.query(
    `select 
      duracao, 
      duracao_consulta, 
      especialidades.nome as nome,
      usuarios.nome as nome_profissional, 
      usuarios.url_imagem as foto_profissional, 
      usuarios.sobre as descricao,
      usuarios.descricao_nota,
      usuarios.id as id_profissional,
      usuarios_especialidades.id as id_usuario_especialidade, 
      usuarios_especialidades.valor_consulta 
    from 
      usuarios_especialidades,
      especialidades,
      usuarios 
    where 
      id_especialidade = especialidades.id
      ${ativo ? "AND ativo = true" : ""}
    and 
      usuarios.id=usuarios_especialidades.id_usuario 
    and 
      usuarios_especialidades.id_ambiente='${id_ambiente}' 
    and 
      especialidades.nome='${especialidade}' 
    and 
      especialidades.permite_particular=true`,
    {
      nest: true,
      type: QueryTypes.SELECT,
    }
  );
}

async function createEspecialidade(request) {
  return especialidades.create(request);
}

async function getEspecialidades(request) {
  return especialidades.findAll({
    where: request,
  });
}

async function getEspecialidade(id) {
  return especialidades.findOne({
    where: {
      id,
    },
  });
}

async function updateEspecialidade(id, data) {
  return especialidades.update(data, {
    where: {
      id,
    },
  });
}

async function deleteEspecialidade(id) {
  return especialidades.destroy({
    where: {
      id,
    },
  });
}

async function hasFieldRegistered(field, request) {
  return especialidades.findOne({
    where: {
      [field]: request[field],
      id_ambiente: request.id_ambiente,
    },
  });
}

export default {
  hasFieldRegistered,
  createEspecialidade,
  deleteEspecialidade,
  getEspecialidade,
  getEspecialidades,
  updateEspecialidade,
  getEspecialidadesParticular,
  getProfissionais,
};
