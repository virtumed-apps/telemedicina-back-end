import { token_atendimentos } from '../models';

async function createAgendamentoToken(request) {
  return token_atendimentos.create(request);
}

async function getAgendamentoTokens(request) {
  return token_atendimentos.findAll(request);
}

async function getAgendamentoToken(id) {
  return token_atendimentos.findOne({
    where: {
      id,
    },
  });
}

async function getAgendamentoTokenByHash(token) {
  return token_atendimentos.findOne({
    where: {
      token,
    },
  });
}

async function updateAgendamentoToken(id, data) {
  return token_atendimentos.update(data, {
    where: {
      id,
    },
  });
}

async function deleteAgendamentoToken(id) {
  return token_atendimentos.destroy({
    where: {
      id,
    },
  });
}

export default {
  getAgendamentoTokenByHash,
  createAgendamentoToken,
  deleteAgendamentoToken,
  getAgendamentoToken,
  getAgendamentoTokens,
  updateAgendamentoToken,
};
