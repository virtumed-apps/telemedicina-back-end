import service from '../services/convenios';
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
} = responseMessages('convênio');

async function createConvenio(request, response) {
  try {
    const data = await service.createConvenio(request.custom);

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

async function getConvenios(request, response) {
  try {
    const data = await service.getConvenios(request.custom);

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

async function getConvenio(request, response) {
  try {
    const { id } = request.params;
    const convenio = await service.getConvenio(id);

    if (convenio) {
      const data = await service.getConvenio(id);
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

async function deleteConvenio(request, response) {
  try {
    const { id } = request.params;

    const convenio = await service.getConvenio(id);

    if (convenio) {
      const data = await service.deleteConvenio(id);
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

async function updateConvenio(request, response) {
  try {
    const { id } = request.params;

    const convenio = await service.getConvenio(id);

    if (convenio) {
      const data = await service.updateConvenio(id, request.body);
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
  createConvenio,
  updateConvenio,
  deleteConvenio,
  getConvenio,
  getConvenios,
};
