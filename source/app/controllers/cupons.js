/* eslint-disable camelcase */
import service from '../services/cupons';
import usuariosCupons from '../services/usuariosCupons';
import logger from '../../utilities/logger';
import { sendSuccess, sendError } from '../../utilities/response';
import { responseMessages } from '../../utilities/constants';
import { isExpired } from '../../utilities/date';

const {
  EMPTY_MESSAGE,
  DELETE_MESSAGE,
  SUCCESS_GET_MESSAGE,
  SUCCESS_PATCH_MESSAGE,
  SUCCESS_GETALL_MESSAGE,
  SUCCESS_CREATE_MESSAGE,
  EMPTY_GETALL_MESSAGE,
} = responseMessages('cupom');

async function createCupom(request, response) {
  try {
    const { cupom, id_ambiente } = request.custom;

    const hasCupom = await service.getCupomByCode({ id: cupom, id_ambiente });

    if (hasCupom) {
      sendError({
        response,
        status: 400,
        message: 'Já existe um cupom com esse nome!',
      });
      return;
    }

    await service.createCupom(request.custom);

    sendSuccess({
      response,
      status: 201,
      message: SUCCESS_CREATE_MESSAGE,
    });
  } catch (error) {
    console.log('error', error);
    logger.error(error);
    sendError({
      response,
      status: 400,
      error,
      message: error.message,
    });
  }
}

async function getCupons(request, response) {
  try {
    const data = await service.getCupons(request.custom);

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
    console.log('error', error);
    logger.error(error);
    sendError({
      response,
      status: 400,
      error,
      message: error.message,
    });
  }
}

async function getCupom(request, response) {
  try {
    const { id } = request.params;
    const Cupom = await service.getCupom(id);

    if (Cupom) {
      sendSuccess({
        response,
        status: 200,
        data: Cupom,
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

async function deleteCupom(request, response) {
  try {
    const { id } = request.params;

    const cupom = await service.getCupom(id);

    if (cupom) {
      const data = await service.deleteCupom(id);
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

async function updateCupom(request, response) {
  try {
    const { id } = request.params;

    const Cupom = await service.getCupom(id);

    if (Cupom) {
      const data = await service.updateCupom(id, request.body);
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

async function validateCoupon(request, response) {
  try {
    const { cupom: id } = request.params;
    const { id_ambiente } = request.custom;
    const { id_usuario } = request.query;

    /* VALIDA SE O CUPOM EXISTE */
    const cupom = await service.getCupomByCode({ id, id_ambiente });

    if (!cupom) {
      sendError({
        response,
        status: 400,
        message: 'O cupom não existe!',
      });
      return;
    }

    /* VALIDA SE O CUPOM ESTÁ DESABILTADO */
    if (cupom.desabilitado) {
      sendError({
        response,
        status: 400,
        message: 'O cupom não existe!',
      });
      return;
    }

    /* VALIDA SE O CUPOM EXPIROU */
    const expired = isExpired(cupom.expiracao);

    if (expired) {
      sendError({
        response,
        status: 400,
        message: 'O cupom já expirou!',
      });
      return;
    }

    /* VALIDA SE O CUPOM ATINGIU A QUANTIDADE DE USO MÁXIMA */

    if (Number(cupom.quantidade_uso) >= cupom.quantidade_maxima_uso) {
      sendError({
        response,
        status: 400,
        message: 'O cupom já atingiu o número máximo de usos!',
      });
      return;
    }

    /* VALIDA SE O USUÁRIO JÁ UTILIZOU O CUPOM */
    const hasUserUsedCoupon = await usuariosCupons.hasUserUsed(cupom.id, id_usuario);

    if (hasUserUsedCoupon) {
      sendError({
        response,
        status: 400,
        message: 'Você já utilizou esse cupom!',
      });
      return;
    }

    sendSuccess({
      response,
      data: cupom,
      status: 200,
      message: 'Cupom válido!',
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
  validateCoupon,
  createCupom,
  updateCupom,
  deleteCupom,
  getCupom,
  getCupons,
};
