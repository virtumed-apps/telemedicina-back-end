import { usuarios_integracoes } from '../models';

async function createUsuariosIntegracao(request) {
  return usuarios_integracoes.create(request);
}

async function getUsuariosIntegracoes(request) {
  return usuarios_integracoes.findAll(request);
}

async function getUsuariosIntegracao(id) {
  return usuarios_integracoes.findOne({
    where: {
      id,
    },
  });
}

async function getUsuariosIntegracaoIdUsuario(id_usuario) {
  return usuarios_integracoes.findOne({
    where: {
      id_usuario,
    },
  });
}

async function updateUsuariosIntegracao(id, data) {
  return usuarios_integracoes.update(data, {
    where: {
      id,
    },
  });
}

async function deleteUsuariosIntegracao(id) {
  return usuarios_integracoes.destroy({
    where: {
      id,
    },
  });
}

export default {
  createUsuariosIntegracao,
  deleteUsuariosIntegracao,
  getUsuariosIntegracao,
  getUsuariosIntegracoes,
  updateUsuariosIntegracao,
  getUsuariosIntegracaoIdUsuario,
};
