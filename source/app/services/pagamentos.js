import { pagamentos } from '../models';

async function createPagamento(request) {
  return pagamentos.create(request);
}

async function getPagamentos(request) {
  return pagamentos.findAll(request);
}

async function getPagamento(id) {
  return pagamentos.findOne({
    where: {
      id,
    },
  });
}

async function updatePagamento(id, data) {
  return pagamentos.update(data, {
    where: {
      id,
    },
  });
}

async function deletePagamento(id) {
  return pagamentos.destroy({
    where: {
      id,
    },
  });
}

export default {
  createPagamento,
  deletePagamento,
  getPagamento,
  getPagamentos,
  updatePagamento,
};
