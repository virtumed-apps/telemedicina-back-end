import service from '../services/usuariosEspecialidades';
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
} = responseMessages('usuário especialidade');

async function createUsuarioEspecialidade(request, response) {
  try {

    console.log(request.custom); 

    const data = await service.createUsuarioEspecialidade(request.custom);

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

async function getUsuarioEspecialidades(request, response) {
  try {
    const data = await service.getUsuarioEspecialidades(request.custom);

    if (data && data.length) {
      sendSuccess({
        response,
        status: 200,
        data,
        message: SUCCESS_GETALL_MESSAGE,
      });
      return;
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

async function getUsuarioEspecialidade(request, response) {
  try {
    const { id } = request.params;
    const usuarioEspecialidades = await service.getUsuarioEspecialidade(id);

    if (usuarioEspecialidades) {
      const data = await service.getUsuarioEspecialidade(id);
      sendSuccess({
        response,
        status: 200,
        data,
        message: SUCCESS_GET_MESSAGE,
      });
      return;
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

async function deleteUsuarioEspecialidade(request, response) {
  try {
    const { id } = request.params;

    const usuarioEspecialidade = await service.getUsuarioEspecialidade(id);

    if (usuarioEspecialidade) {
      const data = await service.deleteUsuarioEspecialidade(id);
      sendSuccess({
        response,
        status: 200,
        data,
        message: DELETE_MESSAGE,
      });
      return;
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

async function updateUsuarioEspecialidade(request, response) {
  try {
    const { id } = request.params;

    const usuarioEspecialidade = await service.getUsuarioEspecialidade(id);

    if (usuarioEspecialidade) {
      const data = await service.updateUsuarioEspecialidade(id, request.body);
      sendSuccess({
        response,
        status: 200,
        data,
        message: SUCCESS_PATCH_MESSAGE,
      });
      return;
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
  createUsuarioEspecialidade,
  updateUsuarioEspecialidade,
  deleteUsuarioEspecialidade,
  getUsuarioEspecialidade,
  getUsuarioEspecialidades,
};
