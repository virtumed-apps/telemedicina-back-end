import service from '../services/conselhos';
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
} = responseMessages('conselho');

async function createConselho(request, response) {
  try {
    const hasConselho = await service.getConselhos({
      where: {
        nome: request.body.nome,
      },
    });

    if (hasConselho.length) {
      sendError({
        response,
        status: 400,
        message: 'Já existe um conselho com esse nome!',
      });
      return;
    }

    const data = await service.createConselho(request.custom);

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

async function getConselhos(request, response) {
  try {
    const data = await service.getConselhos(request.custom);

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

async function getConselho(request, response) {
  try {
    const { id } = request.params;
    const Conselho = await service.getConselho(id);

    if (Conselho) {
      sendSuccess({
        response,
        status: 200,
        data: Conselho,
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

async function deleteConselho(request, response) {
  try {
    const { id } = request.params;

    const conselho = await service.getConselho(id);

    if (conselho) {
      if (conselho.profissionais.length) {
        sendError({
          response,
          status: 404,
          message: 'Você não pode remover esse conselho, pois existem profissionais vinculados à ele, remova todos os vínculos e tente novamente',
        });
        return;
      }

      const data = await service.deleteConselho(id);
      sendSuccess({
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

async function updateConselho(request, response) {
  try {
    const { id } = request.params;

    const conselho = await service.getConselho(id);

    if (conselho) {
      const data = await service.updateConselho(id, request.body);
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
  createConselho,
  updateConselho,
  deleteConselho,
  getConselho,
  getConselhos,
};
