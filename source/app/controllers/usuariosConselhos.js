import service from '../services/usuariosConselhos';
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
} = responseMessages('usuário conselho');

async function createUsuarioConselho(request, response) {
  try {
    const data = await service.createUsuarioConselho(request.custom);

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

async function getUsuariosConselhos(request, response) {
  try {
    const data = await service.getUsuariosConselhos(request.custom);

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

async function getUsuarioConselho(request, response) {
  try {
    const { id } = request.params;
    const usuarioConselho = await service.getUsuarioConselhoByIdUsuario(id);

    if (usuarioConselho) {
      return sendSuccess({
        response,
        status: 200,
        data: usuarioConselho,
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

async function deleteUsuarioConselho(request, response) {
  try {
    const { id } = request.params;

    const usuarioConselho = await service.getUsuarioConselho(id);

    if (usuarioConselho) {
      const data = await service.deleteUsuarioConselho(id);
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

async function updateUsuarioConselho(request, response) {
  try {
    const { id } = request.params;

    const usuarioConselho = await service.getUsuarioConselho(id);

    if (usuarioConselho) {
      const data = await service.updateUsuarioConselho(id, request.body);
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
  createUsuarioConselho,
  updateUsuarioConselho,
  deleteUsuarioConselho,
  getUsuarioConselho,
  getUsuariosConselhos,
};
