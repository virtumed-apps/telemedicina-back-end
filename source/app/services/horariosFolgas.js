import { horarios_folgas } from '../models';

async function createHorariosFolga(request) {
  return horarios_folgas.create(request);
}

async function getHorariosFolgas({ id, page }) {
  const limit = 5;
  return horarios_folgas.findAndCountAll({
    limit,
    offset: (Number(page) - 1) * Number(limit),
    where: {
      id_usuario: id,
    },
    order: [['data_hora', 'DESC']],
  });
}

async function getHorariosFolga(id) {
  return horarios_folgas.findOne({
    where: {
      id,
    },
  });
}

async function getHorariosFolgaIdUsuario(idUsuario) {
  return horarios_folgas.findAll({
    where: {
      id_usuario: idUsuario,
    },
  });
}

async function updateHorariosFolga(id, data) {
  return horarios_folgas.update(data, {
    where: {
      id,
    },
  });
}

async function deleteHorariosFolga(id) {
  return horarios_folgas.destroy({
    where: {
      id,
    },
  });
}

export default {
  createHorariosFolga,
  deleteHorariosFolga,
  getHorariosFolga,
  getHorariosFolgas,
  updateHorariosFolga,
  getHorariosFolgaIdUsuario,
};
