

import service from '../services/agendamentosInformacoesComplementares';
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
} = responseMessages('dado complementar');

async function createInformacao(request, response) {
  try {
    const data = await service.createInformacao(request.custom);
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

async function getInformacoes(request, response) {
  try {
    let data = await service.getInformacoes(request.custom);
    const dataUser = await service.getInformacoesbyUser(request.custom);

    data = data.concat(dataUser).sort((a, b) => (
      b.data_hora_criacao.getTime() - a.data_hora_criacao.getTime()));

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

async function getInformacao(request, response) {
  try {
    const { id } = request.params;
    const Informacao = await service.getInformacao(id);

    if (Informacao) {
      const data = await service.getInformacao(id);
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

async function deleteInformacao(request, response) {
  try {
    const { id } = request.params;

    const informacao = await service.getInformacao(id);

    if (informacao) {
      const data = await service.deleteInformacao(id);
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

async function updateInformacao(request, response) {
  try {
    const { id } = request.params;

    const informacao = await service.getInformacao(id);

    // if (informacao) {
      const data = await service.updateInformacao(id, request.body);
      return sendSuccess({
        response,
        status: 200,
        data,
        message: SUCCESS_PATCH_MESSAGE,
      });
    // }

    // sendError({
    //   response,
    //   status: 404,
    //   message: EMPTY_MESSAGE,
    // });
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

async function getListFiles(request, response) {
  try {
    const { id } = request.params;

    const files = await service.getFiles(id);

    if (files) {
      return sendSuccess({
        response,
        message: SUCCESS_GET_MESSAGE,
        status: 200,
        data: files
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
  createInformacao,
  updateInformacao,
  deleteInformacao,
  getInformacao,
  getInformacoes,
  getListFiles
};
