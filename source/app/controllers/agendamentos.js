/* eslint-disable camelcase */
import service from '../services/agendamentos';
import usuarioService from '../services/usuarios';
import ambienteService from '../services/configuracoes';
import usuariosEspecialidadesService from '../services/usuariosEspecialidades';
import logger from '../../utilities/logger';
import { sendSuccess, sendError } from '../../utilities/response';
import { responseMessages } from '../../utilities/constants';
import { sendAgendamentoEmail, sendEmail, sendEmailWithAttachment } from '../../utilities/email';
import { dateFromJSFormat } from '../../utilities/date';
import { capitalize } from 'lodash';

const {
  EMPTY_MESSAGE,
  DELETE_MESSAGE,
  SUCCESS_GET_MESSAGE,
  SUCCESS_PATCH_MESSAGE,
  SUCCESS_GETALL_MESSAGE,
  SUCCESS_CREATE_MESSAGE,
  EMPTY_GETALL_MESSAGE,
} = responseMessages('agendamento');

async function createAgendamento(request, response) {
  try {
    const {
      id_profissional,
      id_paciente,
      id_especialidade,
      id_consulta,
      payment,
      emailsMultiplosUsuarios,
      enviar_email: enviarEmailPaciente,
    } = request.custom;

    const ambiente = await ambienteService.getAmbiente(request.headers.ambiente) || {};
    const data = await service.createAgendamento(request.custom);
    const paciente = await usuarioService.getUsuario(id_paciente) || {};
    const profissional = await usuarioService.getUsuario(id_profissional) || {};
    const especialidade = await usuariosEspecialidadesService.getUsuarioEspecialidade(
      id_especialidade,
    );



    if (!payment) {

      await sendEmailWithAttachment({
        subject: `${capitalize(request.headers.ambiente)} - Confirmação de atendimento via telemedicina - ${paciente.nome}`,
        ambiente: request.headers.ambiente,
        template: 'email-profissional',
        email: [profissional.email],
        emailsMultiplosUsuarios,
        ccAddresses: ['samuel@veksti.com', 'atendimento@animare.med.br'],
        data: dateFromJSFormat(data.data_hora),
        datetime: data.data_hora,
        limit: especialidade.duracao,
        celularPaciente: paciente.celular,
        profissional: profissional.nome,
        especialidade: especialidade.tipo,
        paciente: paciente.nome,
        logo: ambiente?.configuracoes?.logotipo_png || ambiente?.configuracoes?.logotipo,
        url: `${request.headers.ambiente}.virtumed.com.br/profissional/consulta/${id_consulta}`,
      });
    }

    if (enviarEmailPaciente) {
      await sendEmailWithAttachment({
        subject: `${capitalize(request.headers.ambiente)} - Confirmação de atendimento via telemedicina - ${paciente.nome}`,
        ambiente: request.headers.ambiente,
        template: 'email-profissional',
        email: [paciente.email],
        ccAddresses: ['samuel@veksti.com', 'atendimento@animare.med.br'],
        data: dateFromJSFormat(data.data_hora),
        datetime: data.data_hora,
        celularPaciente: paciente.celular,
        profissional: profissional.nome,
        especialidade: especialidade.tipo,
        paciente: paciente.nome,
        emailsMultiplosUsuarios,
        logo: ambiente?.configuracoes?.logotipo_png || ambiente?.configuracoes?.logotipo,
        url: `${request.headers.ambiente}.virtumed.com.br/paciente/consulta/${id_consulta}`,
        emailPaciente: true,
      });
    }

    sendSuccess({
      response,
      status: 201,
      data,
      message: SUCCESS_CREATE_MESSAGE,
    });
  } catch (error) {
    console.log(error);
    sendError({
      response,
      status: 400,
      error,
      message: error.message,
    });
  }
}

async function getAgendamentos(request, response) {
  try {
    const data = await service.getAgendamentos(request.custom);
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

async function getUserInAgendamentoByHash(request, response) {

  const { id } = request.params
  const { email } = request.query;

  console.log(id, email, 'aaaaaa')
  try {
    const hasInAgendamento = await service.getUserInAgendamentoByHash(id, email)
    console.log(hasInAgendamento)
    if (hasInAgendamento) {

      sendSuccess({
        response,
        status: 200,
        data: { hasPaciente: true, data: hasInAgendamento },
        message: 'Existe paciente no atendimento'
      })
    } else {
      sendSuccess({
        response,
        status: 200,
        data: { hasPaciente: false, data: {} },
        message: "Não existe paciente vinculado a este atendimento",
      });
    }

  } catch (error) {
    sendError({
      response,
      status: 400,
      data: { hasPaciente: false, data: {} },
      message: "Não existe paciente vinculado a este atendimento",
    });
  }
  return
}

async function getAgendamento(request, response) {
  try {
    const { id } = request.params;
    const { id_consulta } = request.query;

    const agendamento = id_consulta
      ? await service.getAgendamentoByHash(id)
      : await service.getAgendamento(id);

    if (agendamento) {
      sendSuccess({
        response,
        status: 200,
        data: agendamento,
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

async function deleteAgendamento(request, response) {
  try {
    const { id } = request.params;

    const agendamento = await service.getAgendamento(id);

    if (agendamento) {
      const data = await service.deleteAgendamento(id);
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

async function getInformacoesAtendimento(request, response) {
  try {
    const { id } = request.params;

    const agendamento = await service.getAgendamentoByHash(id);

    if (agendamento) {
      sendSuccess({
        response,
        status: 200,
        data: agendamento,
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
    console.log('error!', error);
    logger.error(error);
    sendError({
      response,
      status: 400,
      error,
      message: error.message,
    });
  }
}

async function updateAgendamento(request, response) {
  try {
    const { id } = request.params;

    const agendamento = await service.getAgendamento(id);

    const { status, data_hora } = request.body;

    const { id_profissional, id_paciente } = agendamento;

    const paciente = await usuarioService.getUsuario(id_paciente);
    const profissional = await usuarioService.getUsuario(id_profissional);

    if (agendamento) {
      const data = await service.updateAgendamento(id, request.body);

      sendAgendamentoEmail(
        request.custom.id_ambiente,
        paciente.nome,
        paciente.email,
        status,
        data_hora,
        profissional.nome,
        id,
      );

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
  getInformacoesAtendimento,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento,
  getAgendamento,
  getAgendamentos,
  getUserInAgendamentoByHash
};
