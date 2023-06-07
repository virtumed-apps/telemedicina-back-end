import { convenios } from '../models';

async function createConvenio(request) {
  return convenios.create(request);
}

async function getConvenios(request) {
  return convenios.findAll(request);
}

async function getConvenio(id) {
  return convenios.findOne({
    where: {
      id,
    },
  });
}

async function updateConvenio(id, data) {
  return convenios.update(data, {
    where: {
      id,
    },
  });
}

async function deleteConvenio(id) {
  return convenios.destroy({
    where: {
      id,
    },
  });
}

export default {
  createConvenio,
  deleteConvenio,
  getConvenio,
  getConvenios,
  updateConvenio,
};
