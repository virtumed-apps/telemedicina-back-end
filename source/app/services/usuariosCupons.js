/* eslint-disable camelcase */
import { cupons_usuarios } from '../models';

async function createUsuarioCupom(request) {
  return cupons_usuarios.create(request);
}

async function getUsuariosCupons(request) {
  return cupons_usuarios.findAll(request);
}

async function getUsuarioCupom(id) {
  return cupons_usuarios.findOne({
    where: {
      id,
    },
  });
}

async function updateUsuarioCupom(id, data) {
  return cupons_usuarios.update(data, {
    where: {
      id,
    },
  });
}

async function deleteUsuarioCupom(id) {
  return cupons_usuarios.destroy({
    where: {
      id,
    },
  });
}

async function hasUserUsed(id_cupom, id_usuario) {
  return cupons_usuarios.findOne({
    where: {
      id_cupom,
      id_usuario,
    },
  });
}

export default {
  hasUserUsed,
  createUsuarioCupom,
  deleteUsuarioCupom,
  getUsuarioCupom,
  getUsuariosCupons,
  updateUsuarioCupom,
};
