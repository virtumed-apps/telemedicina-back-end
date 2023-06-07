/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
import service from '../services/agendamentosToken';
import ambienteService from '../services/configuracoes';
import logger from '../../utilities/logger';
import { sendSuccess, sendError } from '../../utilities/response';
import { responseMessages } from '../../utilities/constants';
import agendamentoService from '../services/agendamentos';
import usuarioService from '../services/usuarios';
import utilities from '../../utilities/agendamentosToken';
import {
  addDateTime,
  dateFromJSFormat,
  isExpired,
} from '../../utilities/date';
import { sendEmail } from '../../utilities/email';
import { capitalize } from 'lodash';



const {
  EMPTY_MESSAGE,
  DELETE_MESSAGE,
  SUCCESS_GET_MESSAGE,
  SUCCESS_PATCH_MESSAGE,
  SUCCESS_GETALL_MESSAGE,
  SUCCESS_CREATE_MESSAGE,
  EMPTY_GETALL_MESSAGE,
} = responseMessages('Tokens de agendamento');

async function createAgendamentoToken(request, response) {
  try {
    const data = await service.createAgendamentoToken(request.custom);

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

async function getAgendamentoTokens(request, response) {
  try {
    const data = await service.getAgendamentoTokens(request.custom);

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

async function getAgendamentoToken(request, response) {
  try {
    const { id } = request.params;
    const AgendamentoToken = await service.getAgendamentoToken(id);

    if (AgendamentoToken) {
      const data = await service.getAgendamentoToken(id);
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

async function deleteAgendamentoToken(request, response) {
  try {
    const { id } = request.params;

    const AgendamentoToken = await service.getAgendamentoToken(id);

    if (AgendamentoToken) {
      const data = await service.deleteAgendamentoToken(id);
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

async function updateAgendamentoToken(request, response) {
  try {
    const { id } = request.params;

    const AgendamentoToken = await service.getAgendamentoToken(id);

    if (AgendamentoToken) {
      const data = await service.updateAgendamentoToken(id, request.body);
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

async function validateScheduleToken(request, response) {
  try {
    /**
     * Retorna se o token está válido (não expirado)
     * @param {string} token- Identificador "token"
     * @return - Retorna erro/sucesso pelo status code.
     */

    const { token } = request.params;

    const {
      id_agendamento,
    } = request.query;

    /* RETORNA O DADO PELO TOKEN */
    const scheduleToken = await service.getAgendamentoTokenByHash(token);

    /* VALIDA SE O TOKEN EXISTE */
    if (!scheduleToken) {
      sendError({
        response,
        status: 404,
        message: 'Não existe nenhum token com esse identificador',
      });
      return;
    }

    /* VALIDA SE O TOKEN ESTÁ SENDO VINCULADO AO AGENDAMENTO CORRETO */
    if (Number(id_agendamento) !== scheduleToken.id_agendamento) {
      sendError({
        response,
        status: 404,
        message: 'Erro, Token inválido!',
      });
      return;
    }

    /* RETORNA SE O TOKEN JÁ ESTÁ EXPIRADO */
    const expired = isExpired(scheduleToken.expira);

    /* SE ESTIVER EXPIRADO, RETORNA ERRO */
    if (expired) {
      sendError({
        response,
        status: 498,
        message: `Erro, token expirado na data ${dateFromJSFormat(
          scheduleToken.expira,
          'dd/MM/yyyy HH:mm',
          scheduleToken.email,
        )}.`,
      });
      return;
    }

    sendSuccess({
      response,
      status: 200,
      message: 'Token válido!',
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


async function generateScheduleTokens(request, response) {
  try {

  
    /**
     * Retorna se o token está válido (não expirado)
     * @param {Array} emails E-mails de todos os usuários que receberão o token
     * @param {Number} id_agendamento ID do agendamento vinculado
     */
    const { emails, id_agendamento } = request.body;
    
    /* RETORNA OS DADOS DO AGENDAMENTO */
    const agendamento = await agendamentoService.getAgendamento(id_agendamento);

    /* VÁLIDA SE POSSUI AMBIENTE */
    if (!agendamento) {
      sendError({
        response,
        status: 404,
        message:
          'Não existe nenhum agendamento vínculado com esse identificador',
      });
      return;
    }

    /* RETORNA OS DADOS DO AMBIENTE */
    const ambiente = await ambienteService.getAmbiente(
      request.headers.ambiente,
    );

    /* VÁLIDA SE POSSUI AGENDAMENTO */
    if (!ambiente) {
      sendError({
        response,
        status: 404,
        message: 'Não existe nenhum ambiente vínculado com esse identificador',
      });
      return;
    }

    /* VÁLIDA SE POSSUI ALGUM E-MAIL INVÁLIDO */
    const invalidEmails = utilities.validateEmailArray(emails);

    /* SE POSSUIR ALGUM E-MAIL INVÁLIDO, RETORNA ERRO */
    if (invalidEmails.length) {
      sendError({
        response,
        status: 404,
        message: `O(s) e-mails a seguir estão inválidos (${invalidEmails.join(
          ', ',
        )})`,
      });
      return;
    }

    /* GERA UMA DATA DE EXPIRAÇÃO UM DIA MAIOR DO QUE A DATA/HORA DO AGENDAMENTO */
    const expira = addDateTime(agendamento.data_hora, 1);

    /* PARA CADA E-MAIL NO ARRAY */
    for await (const email of emails) {
      /* GERA UM TOKEN DE 6 PALAVRAS/LETRAS */
      const token = Math.random().toString(36).substring(10);

      /* ARMAZENA O TOKEN ENVIADO NO BANCO DE DADOS */
      await service.createAgendamentoToken({
        id_ambiente: request.headers.ambiente,
        id_agendamento,
        token: token.substring(0, 7),
        email,
        expira,
      });

      /* ENVIA UM E-MAIL PARA O USUÁRIO COM O TOKEN */
      await sendEmail({
        template: 'email-token-atendimento',
        ambiente: request.headers.ambiente,
        email,
        subject: `${capitalize(request.headers.ambiente)} - Atendimento familiar `,
        token,
        id_consulta: agendamento.id_consulta,
        profissional: agendamento.profissional,
        data: dateFromJSFormat(agendamento.data_hora, 'dd/MM/yyyy '),
        horario: dateFromJSFormat(agendamento.data_hora, 'HH:mm'),
        logo: ambiente?.configuracoes?.logotipo,
      });
    }

    sendSuccess({
      response,
      status: 200,
      message: 'Tokens enviados com sucesso!',
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
  validateScheduleToken,
  generateScheduleTokens,
  createAgendamentoToken,
  updateAgendamentoToken,
  deleteAgendamentoToken,
  getAgendamentoToken,
  getAgendamentoTokens,
};

