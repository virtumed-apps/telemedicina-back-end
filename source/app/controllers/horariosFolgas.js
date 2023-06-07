import service from "../services/horariosFolgas";
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
} = responseMessages("horarios de folgas");

async function createHorariosFolga(request, response) {
  try {
    const data = await service.createHorariosFolga(request.custom);

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

async function getHorariosFolgas(request, response) {
  try {
    const { page, idUsuario } = request.query;

    const data = await service.getHorariosFolgas({
      id: Number(idUsuario),
      page,
    });

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

async function getHorariosFolga(request, response) {
  try {
    const { id } = request.params;
    const horariosFolga = await service.getHorariosFolga(id);

    if (horariosFolga) {
      const data = await service.getHorariosFolga(id);
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

async function deleteHorariosFolga(request, response) {
  try {
    const { id } = request.params;

    const horariosFolga = await service.getHorariosFolga(id);

    if (horariosFolga) {
      const data = await service.deleteHorariosFolga(id);
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

async function updateHorariosFolga(request, response) {
  try {
    const { id } = request.params;

    const horariosFolga = await service.getHorariosFolga(id);

    if (horariosFolga) {
      const data = await service.updateHorariosFolga(id, request.body);
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
  createHorariosFolga,
  updateHorariosFolga,
  deleteHorariosFolga,
  getHorariosFolga,
  getHorariosFolgas,
};
