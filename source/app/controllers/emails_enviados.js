import service from '../services/emailsEnviados';
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
} = responseMessages('emailEnviado');

async function createEmailEnviado(request, response) {
  try {
    const data = await service.createEmailEnviado(request.custom);

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

async function getEmailsEnviados(request, response) {
  try {
    const data = await service.getEmailsEnviados(request.custom);

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

async function getEmailEnviado(request, response) {
  try {
    const { id } = request.params;
    const EmailEnviado = await service.getEmailEnviado(id);

    if (EmailEnviado) {
      const data = await service.getEmailEnviado(id);
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

async function deleteEmailEnviado(request, response) {
  try {
    const { id } = request.params;

    const emailEnviado = await service.getEmailEnviados(id);

    if (emailEnviado) {
      if (emailEnviado.profissionais.length) {
        return sendError({
          response,
          status: 404,
          message: 'Você não pode remover esse emailEnviado, pois existem profissionais vinculados à ele, remova todos os vínculos e tente novamente',
        });
      }

      const data = await service.deleteEmailEnviados(id);
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

async function updateEmailEnviado(request, response) {
  try {
    const { id } = request.params;

    const emailEnviado = await service.getEmailEnviados(id);

    if (emailEnviado) {
      const data = await service.updateEmailEnviados(id, request.body);
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
  createEmailEnviado,
  updateEmailEnviado,
  deleteEmailEnviado,
  getEmailEnviado,
  getEmailsEnviados,
};
