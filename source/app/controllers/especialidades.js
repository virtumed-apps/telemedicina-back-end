import service from "../services/especialidades";
import logger from "../../utilities/logger";
import { sendSuccess, sendError } from "../../utilities/response";
import { responseMessages } from "../../utilities/constants";

const {
  EMPTY_MESSAGE,
  DELETE_MESSAGE,
  SUCCESS_GET_MESSAGE,
  SUCCESS_PATCH_MESSAGE,
  SUCCESS_GETALL_MESSAGE,
  SUCCESS_CREATE_MESSAGE,
  EMPTY_GETALL_MESSAGE,
} = responseMessages("especialidade");

async function getEspecialidadesParticular(request, response) {
  try {
    const data = await service.getEspecialidadesParticular(request.custom);

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

async function getProfissionais(request, response) {
  try {
    const data = await service.getProfissionais(request.custom);

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

async function createEspecialidade(request, response) {
  try {
    const data = await service.createEspecialidade(request.custom);

    sendSuccess({
      response,
      status: 201,
      data,
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

async function getEspecialidades(request, response) {
  try {
    const data = await service.getEspecialidades(request.custom);

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

async function getEspecialidade(request, response) {
  try {
    const { id } = request.params;
    const especialidade = await service.getEspecialidade(id);

    if (especialidade) {
      const data = await service.getEspecialidade(id);
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

async function deleteEspecialidade(request, response) {
  try {
    const { id } = request.params;

    const especialidade = await service.getEspecialidade(id);

    if (especialidade) {
      const data = await service.deleteEspecialidade(id);
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

async function updateEspecialidade(request, response) {
  try {
    const { id } = request.params;

    const especialidade = await service.getEspecialidade(id);

    if (especialidade) {
      const data = await service.updateEspecialidade(id, request.body);
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
  createEspecialidade,
  updateEspecialidade,
  deleteEspecialidade,
  getEspecialidade,
  getEspecialidades,
  getProfissionais,
  getEspecialidadesParticular,
};
