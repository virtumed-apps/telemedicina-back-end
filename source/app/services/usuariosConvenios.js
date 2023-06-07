import { usuarios_convenios } from '../models';

async function createUsuarioConvenio(request) {
  return usuarios_convenios.create(request);
}

async function getUsuariosConvenios(request) {
  return usuarios_convenios.findAll(request);
}

async function getUsuarioConvenio(id) {
  return usuarios_convenios.findOne({
    where: {
      id,
    },
  });
}

async function updateUsuarioConvenio(id, data) {
  return usuarios_convenios.update(data, {
    where: {
      id,
    },
  });
}

async function deleteUsuarioConvenio(id) {
  return usuarios_convenios.destroy({
    where: {
      id,
    },
  });
}

export default {
  createUsuarioConvenio,
  deleteUsuarioConvenio,
  getUsuarioConvenio,
  getUsuariosConvenios,
  updateUsuarioConvenio,
};
