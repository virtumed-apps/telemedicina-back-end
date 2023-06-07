/* eslint-disable camelcase */
import bcrypt from "bcryptjs";
import service from "../services/usuarios";
import logger from "../../utilities/logger";
import { sendSuccess, sendError } from "../../utilities/response";
import { responseMessages } from "../../utilities/constants";
import { sendConfirmationEmail } from "../../utilities/email";

const {
  EMPTY_MESSAGE,
  DELETE_MESSAGE,
  SUCCESS_GET_MESSAGE,
  SUCCESS_PATCH_MESSAGE,
  SUCCESS_GETALL_MESSAGE,
  SUCCESS_CREATE_MESSAGE,
  EMPTY_GETALL_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} = responseMessages("usuário");

async function createUsuario(request, response) {

  try {
    const { email, nome, id_ambiente, logotipo, passaporte } = request.body;

    if (!passaporte) {

      const hasCpfRegistered = await service.hasFieldRegistered(
        "cpf",
        request.custom
      );


      if (hasCpfRegistered) {
       // response.json({errorTeste: 'testeeee'})
        sendError({
          response,
          status: 206,
          message: "Já existe um usuário cadastrado com esse CPF",
        });
        return ;
      }
    }

    const hasEmailRegistered = await service.hasFieldRegistered(
      "email",
      request.custom
    );

    if (hasEmailRegistered) {
      sendError({
        response,
        status: 206,
        message: "Já existe um usuário cadastrado com esse e-mail",
      });
      return;
    }

    const data = await service.createUsuario(request.custom);

    sendConfirmationEmail(request.custom.id_ambiente, nome, email, logotipo);

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

async function getUsuarios(request, response) {  
  try {
    const data = await service.getUsuarios(request.custom);

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

async function getUsuario(request, response) {
  try {
    const { id } = request.params;
    const usuario = await service.getUsuario(id);

    if (usuario) {
      sendSuccess({
        response,
        status: 200,
        data: usuario,
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

async function deleteUsuario(request, response) {
  try {
    const { id } = request.params;

    const usuario = await service.getUsuario(id);

    if (usuario) {
      const data = await service.deleteUsuario(id);
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

async function updateUsuario(request, response) {

  try {
    const { id } = request.params;

    const usuario = await service.getUsuario(id);

    if (request.custom.cpf && request.custom.cpf !== usuario.cpf) {
      const hasCpfRegistered = await service.hasFieldRegistered(
        "cpf",
        request.body
      );

      if (hasCpfRegistered) {
        sendError({
          response,
          status: 409,
          message: "Já existe um usuário cadastrado com esse CPF",
        });
        return;
      }
    }

    if (request.custom.email && request.custom.email !== usuario.email) {
      const hasEmailRegistered = await service.hasFieldRegistered(
        "email",
        request.body
      );

      if (hasEmailRegistered) {
        sendError({
          response,
          status: 409,
          message: "Já existe um usuário cadastrado com esse e-mail",
        });
        return;
      }
    }

    if (usuario) {
      if (request.body.senha)
        request.body.senha = await bcrypt.hash(request.body.senha, 10);

      const data = await service.updateUsuario(id, request.body);
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

async function getUsuarioByField(request, response) {
  try {
    const { field } = request.custom;

    const usuario = await service.hasFieldRegistered(field, request.custom);

    sendSuccess({
      response,
      status: 200,
      data: usuario,
      message: DEFAULT_SUCCESS_MESSAGE,
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

async function getUsuariosFilter(request, response) {
  try {
    /* VALIDA SE EXISTE O FILTRO */
    if (!service[request.query.type]) {
      sendError({
        response,
        status: 404,
        message: "Não existe nenhum filtro!",
      });
      return;
    }

    const data = await service[request.query.type](request.custom);

    sendSuccess({
      response,
      status: 200,
      data,
      message: DEFAULT_SUCCESS_MESSAGE,
    });
  } catch (error) {
    console.log("error ->", error);
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
  getUsuariosFilter,
  getUsuarioByField,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarios,
};
