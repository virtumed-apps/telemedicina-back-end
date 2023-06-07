import service from '../services/usuariosConvenios';
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
} = responseMessages('usuários convênios');

async function createUsuarioConvenio(request, response) {
  try {
    const data = await service.createUsuarioConvenio(request.custom);

    sendSuccess({
      response,
      status: 201,
      message: SUCCESS_CREATE_MESSAGE,
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

async function getUsuarioConvenios(request, response) {
  try {
    const data = await service.getUsuariosConvenios(request.custom);

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

async function getUsuarioConvenio(request, response) {
  try {
    const { id } = request.params;
    const usuarioConvenio = await service.getUsuarioConvenio(id);

    if (usuarioConvenio) {
      const data = await service.getUsuarioConvenio(id);
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

async function deleteUsuarioConvenio(request, response) {
  try {
    const { id } = request.params;

    const usuarioConvenio = await service.getUsuarioConvenio(id);

    if (usuarioConvenio) {
      const data = await service.deleteUsuarioConvenio(id);
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

async function updateUsuarioConvenio(request, response) {
  try {
    const { id } = request.params;

    const usuarioConvenio = await service.getUsuarioConvenio(id);

    if (usuarioConvenio) {
      const data = await service.updateUsuarioConvenio(id, request.body);
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
  createUsuarioConvenio,
  updateUsuarioConvenio,
  deleteUsuarioConvenio,
  getUsuarioConvenio,
  getUsuarioConvenios,
};
