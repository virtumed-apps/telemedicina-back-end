import { QueryTypes } from 'sequelize';
import database, { agendamentos, sequelize } from '../models';

async function createAgendamento(request) {
  return agendamentos.create(request);
}

async function getAgendamentos(request) {
  return sequelize.query(
    /* sql */ `
     SELECT a.*, 
       ue.duracao AS duracao,
       ue.duracao_limite as duracao_limite,
       ue.valor_consulta as valor_consulta, 
       e.nome as especialidade,
       u.nome as profissional,
       u2.nome as paciente,
       u.url_imagem as foto_profissional
     FROM AGENDAMENTOS a
     LEFT JOIN usuarios_especialidades ue
       ON a.id_especialidade = ue.id
     LEFT JOIN especialidades e
       ON e.id = ue.id_especialidade
     LEFT JOIN usuarios u
       ON u.id = a.id_profissional
     LEFT JOIN usuarios u2
      ON u2.id = a.id_paciente
     WHERE a.id_ambiente = '${request.id_ambiente}'
     ${request.id_paciente ? `AND a.id_paciente = ${request.id_paciente}` : ''} 
     ${request.id_profissional ? `AND a.id_profissional = '${request.id_profissional}'` : ''}
     ${request.id_especialidade ? `AND a.id_especialidade = ${request.id_especialidade}` : ''}
  `,
    {
      nest: true,
      type: sequelize.QueryTypes.SELECT,
    },
  );
}

async function getAgendamento(id) {
  return sequelize.query(
    /* sql */ `
     SELECT a.*, 
       ue.duracao AS duracao,
       ue.valor_consulta as valor_consulta, 
       e.nome as especialidade,
       u.nome as profissional,
       u2.nome as paciente,
       u.url_imagem as foto_profissional
     FROM AGENDAMENTOS a
     LEFT JOIN usuarios_especialidades ue
       ON a.id_especialidade = ue.id
     LEFT JOIN especialidades e
       ON e.id = ue.id_especialidade
     LEFT JOIN usuarios u
       ON u.id = a.id_profissional
     LEFT JOIN usuarios u2
      ON u2.id = a.id_paciente
    WHERE a.id = ${id}
  `,
    {
      plain: true,
      type: sequelize.QueryTypes.SELECT,
    },
  );
}

async function getUserInAgendamentoByHash(id_consulta, email) {
  return sequelize.query(
    `
      SELECT a.id_paciente AS idPaciente,
        u.nome AS nome,
        u.email AS email
        FROM agendamentos a 
        INNER JOIN usuarios u
        ON a.id_paciente = u.id
        WHERE a.id_consulta = '${id_consulta}' AND u.email = '${email}'
    `,
    {
      plain: true,
      type: sequelize.QueryTypes.SELECT,
    }
  )
}

async function getAgendamentoByHash(id_consulta) {
  return sequelize.query(
    /* sql */ `
     SELECT a.*, 
       ue.duracao AS duracao,
       ue.duracao_limite as duracao_limite,
       ue.valor_consulta as valor_consulta, 
       e.nome as especialidade,
       u.nome as profissional,
       u2.nome as paciente,
       u.url_imagem as foto_profissional
     FROM AGENDAMENTOS a
     LEFT JOIN usuarios_especialidades ue
       ON a.id_especialidade = ue.id
     LEFT JOIN especialidades e
       ON e.id = ue.id_especialidade
     LEFT JOIN usuarios u
       ON u.id = a.id_profissional
     LEFT JOIN usuarios u2
      ON u2.id = a.id_paciente
    WHERE a.id_consulta = '${id_consulta}'
  `,
    {
      plain: true,
      type: sequelize.QueryTypes.SELECT,
    },
  );
}

async function updateAgendamento(id, data) {
  return agendamentos.update(data, {
    where: {
      id,
    },
  });
}

async function deleteAgendamento(id) {
  return agendamentos.destroy({
    where: {
      id,
    },
  });
}

async function getAgendamentosProfissional(id) {

  return sequelize.query(
    `
      SELECT
        a.*, 
        ue.duracao as duracao, 
        ue.valor_consulta as valor_consulta
      FROM agendamentos a 
      INNER JOIN usuarios_especialidades ue
      ON a.id_especialidade = ue.id
      WHERE a.id_profissional = ${id}
      AND a.status not like '%cancelado%'
  `,
    {
      nest: true,
      type: sequelize.QueryTypes.SELECT,
    },
  );
}

export default {
  getAgendamentoByHash,
  getAgendamentosProfissional,
  createAgendamento,
  deleteAgendamento,
  getAgendamento,
  getAgendamentos,
  updateAgendamento,
  getUserInAgendamentoByHash
};
