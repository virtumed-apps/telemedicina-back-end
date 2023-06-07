import service from '../services/usuariosRecuperacoesSenha';
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
} = responseMessages('usuário recuperação senha');

async function createUsuarioRecuperacaoSenha(request, response) {
  try {
    const data = await service.createUsuarioRecuperacaoSenha(request.custom);

    sendSuccess({
      response,
      data,
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

async function getUsuariosRecuperacoesSenhas(request, response) {
  try {
    const data = await service.getUsuariosRecuperacoesSenhas(request.custom);

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
    console.log(error);
    logger.error(error);
    sendError({
      response,
      status: 400,
      error,
      message: error.message,
    });
  }
}

async function getUsuarioRecuperacaoSenha(request, response) {
  try {
    const { id } = request.params;
    const usuarioRecuperacaoSenha = await service.getUsuarioRecuperacaoSenha(
      id,
    );

    if (usuarioRecuperacaoSenha) {
      const data = await service.getUsuarioRecuperacaoSenha(id);
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

async function deleteUsuarioRecuperacaoSenha(request, response) {
  try {
    const { id } = request.params;

    const usuarioRecuperacaoSenha = await service.getUsuarioRecuperacaoSenha(
      id,
    );

    if (usuarioRecuperacaoSenha) {
      const data = await service.deleteUsuarioRecuperacaoSenha(id);
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

async function updateUsuarioRecuperacaoSenha(request, response) {
  try {
    const { id } = request.params;

    const usuarioRecuperacaoSenha = await service.getUsuarioRecuperacaoSenha(
      id,
    );

    if (usuarioRecuperacaoSenha) {
      const data = await service.updateUsuarioRecuperacaoSenha(
        id,
        request.body,
      );
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
  createUsuarioRecuperacaoSenha,
  updateUsuarioRecuperacaoSenha,
  deleteUsuarioRecuperacaoSenha,
  getUsuarioRecuperacaoSenha,
  getUsuariosRecuperacoesSenhas,
};
