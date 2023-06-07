import { agendamentos_informacoes_complementares, sequelize } from '../models';
import { Op } from "sequelize";

async function createInformacao(request) {
  return agendamentos_informacoes_complementares.create(request);
}

async function getInformacoes(request) {
  return sequelize.query(
    /* sql */`
      SELECT  afc.*, a.id_paciente AS id_paciente, u.nome AS profissional
        FROM agendamentos_informacoes_complementares afc
      INNER JOIN agendamentos a 
        on afc.id_agendamento = a.id
      INNER JOIN usuarios u 
        on a.id_profissional = u.id
      WHERE afc.id_ambiente = '${request.id_ambiente}'
    ${request.id_paciente ? `AND a.id_paciente = ${request.id_paciente}` : ''} 
    ${request.tipo ? `AND afc.tipo = '${request.tipo}'` : ''} 
    ORDER BY data_hora_atualizacao DESC
  `,
    {
      nest: true,
      type: sequelize.QueryTypes.SELECT,
    },
  );
}

async function getInformacoesbyUser(request) {
  return sequelize.query(
    /* sql */`
      SELECT  afc.*, u.id AS id
        FROM agendamentos_informacoes_complementares afc
      INNER JOIN usuarios u 
        on afc.id_usuario = u.id
      WHERE afc.id_ambiente = '${request.id_ambiente}'
    ${request.id_paciente ? `AND u.id = ${request.id_paciente}` : ''} 
    ${request.tipo ? `AND afc.tipo = '${request.tipo}'` : ''} 
    ORDER BY data_hora_atualizacao DESC
  `,
    {
      nest: true,
      type: sequelize.QueryTypes.SELECT,
    },
  );
}

async function getInformacao(id) {
  return agendamentos_informacoes_complementares.findOne({
    where: {
      id,
    },
  });
}

async function updateInformacao(id, data) {
  return agendamentos_informacoes_complementares.update(data, {
    where: {
      id,
    },
  });
}


async function getFiles(id) {
  return agendamentos_informacoes_complementares.findAll({
    where: {
      id_usuario: id,
      arquivos: {
        [Op.ne]: null
      }
    },
    attributes: ['arquivos']
  });
}

async function deleteInformacao(id) {
  return agendamentos_informacoes_complementares.destroy({
    where: {
      id,
    },
  });
}

export default {
  createInformacao,
  deleteInformacao,
  getInformacao,
  getInformacoes,
  getInformacoesbyUser,
  updateInformacao,
  getFiles
};
