import { usuarios_conselhos } from '../models';

async function createUsuarioConselho(request) {
  return usuarios_conselhos.create(request);
}

async function getUsuariosConselhos(request) {
  return usuarios_conselhos.findAll(request);
}

async function getUsuarioConselho(id) {
  return usuarios_conselhos.findOne({
    where: {
      id,
    },
  });
}

async function getUsuarioConselhoByIdUsuario(id_usuario) {
  return usuarios_conselhos.findOne({
    where: {
      id_usuario,
    },
  });
}

async function updateUsuarioConselho(id, data) {
  return usuarios_conselhos.update(data, {
    where: {
      id,
    },
  });
}

async function deleteUsuarioConselho(id) {
  return usuarios_conselhos.destroy({
    where: {
      id,
    },
  });
}

export default {
  createUsuarioConselho,
  deleteUsuarioConselho,
  getUsuarioConselho,
  getUsuariosConselhos,
  updateUsuarioConselho,
  getUsuarioConselhoByIdUsuario,
};
