import service from '../services/agendamentosIntegracoes';
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
} = responseMessages('integração do agendamento');

async function createIntegracao(request, response) {
  try {
    const data = await service.createIntegracao(request.custom);

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

async function getIntegracoes(request, response) {
  try {
    const data = await service.getIntegracoes(request.custom);

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

async function getIntegracao(request, response) {
  try {
    const { id } = request.params;
    const Integracao = await service.getIntegracao(id);

    if (Integracao) {
      const data = await service.getIntegracao(id);
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

async function deleteIntegracao(request, response) {
  try {
    const { id } = request.params;

    const Integracao = await service.getIntegracao(id);

    if (Integracao) {
      const data = await service.deleteIntegracao(id);
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

async function updateIntegracao(request, response) {
  try {
    const { id } = request.params;

    const Integracao = await service.getIntegracao(id);

    if (Integracao) {
      const data = await service.updateIntegracao(id, request.body);
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
  createIntegracao,
  updateIntegracao,
  deleteIntegracao,
  getIntegracao,
  getIntegracoes,
};
