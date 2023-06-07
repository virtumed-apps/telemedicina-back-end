import service from '../services/usuariosIntegracoes';
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
} = responseMessages('usuário integração');

async function createUsuarioIntegracao(request, response) {
  try {
    const data = await service.createUsuarioIntegracao(request.custom);

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

async function getUsuariosIntegracoes(request, response) {
  try {
    const data = await service.getUsuariosIntegracoes(request.custom);

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

async function getUsuarioIntegracao(request, response) {
  try {
    const { id } = request.params;
    const usuarioIntegracao = await service.getUsuarioIntegracao(id);

    if (usuarioIntegracao) {
      const data = await service.getUsuarioIntegracao(id);
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

async function getUsuarioIntegracaoById(request, response) {
  try {
    const { id_usuario } = request.custom;

    const usuarioIntegracao = await service.getUsuariosIntegracaoIdUsuario(id_usuario);

    if (usuarioIntegracao) {
      const data = await service.getUsuariosIntegracao(usuarioIntegracao.id);
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

async function deleteUsuarioIntegracao(request, response) {
  try {
    const { id } = request.params;

    const usuarioIntegracao = await service.getUsuarioIntegracao(id);

    if (usuarioIntegracao) {
      const data = await service.deleteUsuarioIntegracao(id);
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

async function updateUsuarioIntegracao(request, response) {
  try {
    const { id } = request.params;

    const usuarioIntegracao = await service.getUsuarioIntegracao(id);

    if (usuarioIntegracao) {
      const data = await service.updateUsuarioIntegracao(id, request.body);
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
  createUsuarioIntegracao,
  updateUsuarioIntegracao,
  deleteUsuarioIntegracao,
  getUsuarioIntegracao,
  getUsuariosIntegracoes,
  getUsuarioIntegracaoById,
};
