import { QueryTypes } from 'sequelize';
import { agendamentos_integracoes } from '../models';

async function createAgendamentoIntegracoes(request) {
  return agendamentos_integracoes.create(request);
}

async function getAgendamentosIntegracoes(request) {
  return agendamentos_integracoes.findAll(request);
}

async function getAgendamentoIntegracoes(id) {
  return agendamentos_integracoes.findOne({
    where: {
      id,
    },
  });
}

async function updateAgendamentoIntegracoes(id, data) {
  return agendamentos_integracoes.update(data, {
    where: {
      id,
    },
  });
}

async function deleteAgendamentoIntegracoes(id) {
  return agendamentos_integracoes.destroy({
    where: {
      id,
    },
  });
}

export default {
  createAgendamentoIntegracoes,
  deleteAgendamentoIntegracoes,
  getAgendamentoIntegracoes,
  getAgendamentosIntegracoes,
  updateAgendamentoIntegracoes,
};
