import service from '../services/prescricoes';
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
} = responseMessages('prescricao');

async function createPrescricao(request, response) {
  try {
    const data = await service.createPrescricao(request.custom);

    sendSuccess({
      response,
      status: 201,
      message: SUCCESS_CREATE_MESSAGE,
      data,
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

async function getPrescricoes(request, response) {
  try {
    const data = await service.getPrescricoes(request.custom);

    if (data && data.length) {
      return sendSuccess({
        response,
        status: 200,
        data,
        message: SUCCESS_GETALL_MESSAGE,
      });
    }

    sendSuccess({
      response,
      status: 200,
      data,
      message: EMPTY_GETALL_MESSAGE,
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

async function getPrescricao(request, response) {
  try {
    const { id } = request.params;
    const prescricao = await service.getPrescricao(id);

    if (prescricao) {
      const data = await service.getPrescricao(id);
      return sendSuccess({
        response,
        status: 200,
        data,
        message: SUCCESS_GET_MESSAGE,
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

async function deletePrescricao(request, response) {
  try {
    const { id } = request.params;

    const prescricao = await service.getPrescricao(id);

    if (prescricao) {
      const data = await service.deletePrescricao(id);
      return sendSuccess({
        response,
        status: 200,
        data,
        message: DELETE_MESSAGE,
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

async function updatePrescricao(request, response) {
  try {
    const { id } = request.params;

    const prescricao = await service.getPrescricao(id);

    if (prescricao) {
      const data = await service.updatePrescricao(id, request.body);
      return sendSuccess({
        response,
        status: 200,
        data,
        message: SUCCESS_PATCH_MESSAGE,
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
  createPrescricao,
  updatePrescricao,
  deletePrescricao,
  getPrescricao,
  getPrescricoes,
};
