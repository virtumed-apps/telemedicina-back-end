import { agendamentos_integracoes } from '../models';

async function createReserva(request) {
  return agendamentos_integracoes.create(request);
}

async function getReservas(request) {
  return agendamentos_integracoes.findAll(request);
}

async function getReserva(id) {
  return agendamentos_integracoes.findOne({
    where: {
      id,
    },
  });
}

async function updateReserva(id, data) {
  return agendamentos_integracoes.update(data, {
    where: {
      id,
    },
  });
}

async function deleteReserva(id) {
  return agendamentos_integracoes.destroy({
    where: {
      id,
    },
  });
}

export default {
  createReserva,
  deleteReserva,
  getReserva,
  getReservas,
  updateReserva,
};
