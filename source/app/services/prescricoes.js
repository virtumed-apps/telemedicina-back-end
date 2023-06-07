import { prescricoes } from '../models';

async function createPrescricao(request) {
  return prescricoes.create(request);
}

async function getPrescricoes(request) {
  return prescricoes.findAll(request);
}

async function getPrescricao(id) {
  return prescricoes.findOne({
    where: {
      id,
    },
  });
}

async function updatePrescricao(id, data) {
  return prescricoes.update(data, {
    where: {
      id,
    },
  });
}

async function deletePrescricao(id) {
  return prescricoes.destroy({
    where: {
      id,
    },
  });
}

export default {
  createPrescricao,
  deletePrescricao,
  getPrescricao,
  getPrescricoes,
  updatePrescricao,
};
