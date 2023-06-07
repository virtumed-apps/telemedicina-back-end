import service from '../services/agendamentosReservas';
import logger from '../../utilities/logger';
import { sendSuccess, sendError } from '../../utilities/response';
import { responseMessages } from '../../utilities/constants';

const {
  EMPTY_MESSAGE,
  DELETE_MESSAGE,
  SUCCESS_GET_MESSAGE,
  SUCCESS_PATCH_MESSAGE,
  SUCCESS_GETALL_MESSAGE,
  SUCCESS_CREATE_MESSAGE,
  EMPTY_GETALL_MESSAGE,
} = responseMessages('reservas do agendamento');

async function createReserva(request, response) {
  try {
    const data = await service.createReserva(request.custom);

    sendSuccess({
      response, status: 201, data, message: SUCCESS_CREATE_MESSAGE,
    });
  } catch (error) {
    logger.error(error);
    sendError({
      response,
      status: 400,
      error,
      message: error.message,
    });
  }
}

async function getReservas(request, response) {
  try {
    const data = await service.getReservas(request.custom);

    if (data && data.length) {
      return sendSuccess({
        response, status: 200, data, message: SUCCESS_GETALL_MESSAGE,
      });
    }

    sendSuccess({
      response, status: 200, data, message: EMPTY_GETALL_MESSAGE,
    });
  } catch (error) {
    logger.error(error);
    sendError({
      response,
      status: 400,
      error,
      message: error.message,
    });
  }
}

async function getReserva(request, response) {
  try {
    const { id } = request.params;
    const reserva = await service.getReserva(id);

    if (reserva) {
      const data = await service.getReserva(id);
      return sendSuccess({
        response, status: 200, data, message: SUCCESS_GET_MESSAGE,
      });
    }

    sendError({
      response,
      status: 404,
      message: EMPTY_MESSAGE,
    });
  } catch (error) {
    logger.error(error);
    sendError({
      response,
      status: 400,
      error,
      message: error.message,
    });
  }
}

async function deleteReserva(request, response) {
  try {
    const { id } = request.params;

    const reserva = await service.getReserva(id);

    if (reserva) {
      const data = await service.deleteReserva(id);
      return sendSuccess({
        response, status: 200, data, message: DELETE_MESSAGE,
      });
    }

    sendError({
      response,
      status: 404,
      message: EMPTY_MESSAGE,
    });
  } catch (error) {
    logger.error(error);
    sendError({
      response,
      status: 400,
      error,
      message: error.message,
    });
  }
}

async function updateReserva(request, response) {
  try {
    const { id } = request.params;

    const reserva = await service.getReserva(id);

    if (reserva) {
      const data = await service.updateReserva(id, request.body);
      return sendSuccess({
        response, status: 200, data, message: SUCCESS_PATCH_MESSAGE,
      });
    }

    sendError({
      response,
      status: 404,
      message: EMPTY_MESSAGE,
    });
  } catch (error) {
    logger.error(error);
    sendError({
      response,
      status: 400,
      error,
      message: error.message,
    });
  }
}

export default {
  createReserva,
  updateReserva,
  deleteReserva,
  getReserva,
  getReservas,
};
