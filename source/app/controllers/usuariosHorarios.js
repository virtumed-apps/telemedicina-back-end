/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable camelcase */
import { responseMessages } from "../../utilities/constants";
import {
  getDateRange,
  getSchedule,
  isDateBigger,
  isExpiredSchedule,
  formatToDateTime,
} from "../../utilities/date";
import logger from "../../utilities/logger";
import { sendError, sendSuccess } from "../../utilities/response";
import service from "../services/usuariosHorarios";
import EspecialidadesMedicosService from "../services/usuariosEspecialidades";
import AgendamentosService from "../services/agendamentos";
import HorariosFolgas from "../services/horariosFolgas";

const {
  EMPTY_MESSAGE,
  DELETE_MESSAGE,
  SUCCESS_GET_MESSAGE,
  SUCCESS_PATCH_MESSAGE,
  SUCCESS_GETALL_MESSAGE,
  SUCCESS_CREATE_MESSAGE,
  EMPTY_GETALL_MESSAGE,
} = responseMessages("Horário(s)");

async function createUsuarioHorario(request, response) {
  try {
    await service.createUsuarioHorario(request.custom);

    sendSuccess({
      response,
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

async function getUsuariosHorarios(request, response) {
  try {
    const data = await service.getUsuarioHorarios(request.custom);

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

async function getUsuarioHorario(request, response) {
  try {
    const { id } = request.params;
    const usuarioHorario = await service.getUsuarioHorario(id);

    if (usuarioHorario) {
      const data = await service.getUsuarioHorario(id);
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

async function getUsuarioHorariosFracionados(request, response) {
  try {
    const { id } = request.params;
    const data = await service.getUsuarioHorariosFracionados(
      request.custom,
      id
    );

    if (!data) {
      sendError({
        response,
        status: 404,
        message: EMPTY_MESSAGE,
      });

      return;
    }

    sendSuccess({
      response,
      status: 200,
      data,
      message: SUCCESS_GET_MESSAGE,
    });
    return;
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

async function deleteUsuarioHorario(request, response) {
  try {
    const { id } = request.params;

    const usuarioHorario = await service.getUsuarioHorario(id);

    if (usuarioHorario) {
      const data = await service.deleteUsuarioHorario(id);
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

async function deleteUsuarioHorarioFracionado(request, response) {
  try {
    const { id } = request.params;

    const usuarioHorario = await service.getUsuarioHorarioFracionado(id);

    if (usuarioHorario) {
      const data = await service.deleteUsuarioHorario(id);
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

async function updateUsuarioHorario(request, response) {
  try {
    const { id } = request.params;
    const { id_usuario } = request.body;

    const usuarioHorario = await service.getUsuarioHorario(id_usuario);

    if (usuarioHorario) {
      const data = await service.updateUsuarioHorario(id, request.body);
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

async function getUsuarioAgenda(request, response) {
  try {
    /**
     * Retorna a agenda do profissional
     * @param {id} - Identificador da especialidade vinculada ao profissional
     * @param {dataLimite} - Recebe uma data limite com propósitos de lazy-loading/infinity-scroll
     * @return {array} - Retorna um array contendo todas as datas e horários disponíveis do profissional
    */

    const { id } = request.params;
    const { dataLimite } = request.query;

    /* RETORNA A ESPECIALIDADE VINCULADA AO PROFISSIONAL */
    const especialidade =
      await EspecialidadesMedicosService.getUsuarioEspecialidade(id);

    /* VALIDA SE O PROFISSIONAL POSSUI ESPECIALIDADE */
    if (!especialidade) {
      sendError({
        response,
        status: 404,
        message: "O profissional não possui especialidade cadastrada!",
      });
      return;
    }

    /* RETORNA A AGENDA DO PROFISSIONAL COM BASE NO ID DO MESMO */
    const agendas = await service.getUsuarioHorarioFracionadoAgenda(
      especialidade.id_usuario
    );

    const dataLimit = [];
    const diasSemana = [];
    const schedulesList = [];

    for (const agenda of agendas) {
      let { datasSelecionadas = "" } = request.query;
      /* VALIDA SE O PROFISSIONAL POSSUI AGENDA */
      if (!agenda) {
        sendError({
          response,
          status: 404,
          message: "O profissional não possui agenda cadastrada!",
        });
        return;
      }

      /* VALIDA SE A AGENDA DO PROFISSIONAL EXPIROU */
      if (isExpiredSchedule(agenda.data_limite)) {
        sendError({
          response,
          status: 498,
          message:
            "A agenda do profissional já expirou, acesse o cadastro do mesmo para atualizar.",
        });
        return;
      }

      /* VALIDA SE A DATA LIMITE (dataLimite) É MAIOR DO QUE A DATA LIMITE
       * RETORNADA DA AGENDA DO PROFISSIONAL (agenda.data_limite)
       */
      const dataMaxima =
        dataLimite && isDateBigger(dataLimite, agenda.data_limite)
          ? agenda.data_limite
          : dataLimite;

      /* RETORNA TODOS OS AGENDAMENTO VINCULADOS AO PROFISSIONAL */
      const agendamentos =
        await AgendamentosService.getAgendamentosProfissional(
          especialidade.id_usuario
        );

      /* RETORNA TODOS OS HORARIOS DE FOLGA */
      const horariosFolga = await HorariosFolgas.getHorariosFolgaIdUsuario(
        especialidade.id_usuario
      );

      /* COLETA O RANGE DE DATAS, DATA ATUAL ATÉ A DATA LIMITE (PASSADA VIA PARÂMETRO) */
      // const dataLimiteMax = currentDateTime().plus({ day: 365 }).toFormat('yyyy-MM-dd');
      const dataLimiteRange = dataLimite ? dataMaxima : agenda.data_limite;

      /**
       * Trata datas recebidas ou retorna todas dentro do próximo ano
       */
      if (datasSelecionadas || datasSelecionadas !== "") {
        const datasSelecionadasSplit = datasSelecionadas;

        datasSelecionadas = [];

        let dataFormatada = {};

        datasSelecionadasSplit.forEach((data) => {
          dataFormatada = formatToDateTime(data, "yyyy-MM-dd");

          if (agenda.dias_semana.includes(dataFormatada.weekday)) {
            datasSelecionadas = [...datasSelecionadas, data];
          }
        });
      } else {

        const datasRange = getDateRange(dataLimiteRange, agenda.dias_semana);

        datasRange.forEach((data) => {
          datasSelecionadas = [
            ...datasSelecionadas,
            data.toFormat("yyyy-MM-dd"),
          ];
        });
      }

      let datas = [];
      /**
       * Seleciona datas dentro do limite
      */
      datasSelecionadas.forEach((data) => {
        if (!isDateBigger(data, dataLimiteRange)) {
          datas = [...datas, formatToDateTime(data, "yyyy-MM-dd")];
        }
      });

      /* DENTRO DO RANGE DE DATAS, EFETUA TODAS AS VALIDAÇÕES NECESSÁRIAS
       * E RETORNA OS HORÁRIOS ***DISPONÍVEIS*** JUNTAMENTE DAS DATAS CORRESPONDENTES
       */

      const schedules = getSchedule(
        datas,
        agendamentos,
        especialidade.duracao,
        agenda.horario_inicial,
        agenda.horario_final,
        horariosFolga
      );

      dataLimit.push(new Date(agenda.data_limite));
      diasSemana.push(...agenda.dias_semana);
      schedulesList.push(...schedules);
    }

    const normalizeSchedule = schedulesList.reduce((o, cur) => {
      // Get the index of the key-value pair.
      const occurs = o.reduce(
        (n, item, i) => (item.date === cur.date ? i : n),
        -1
      );

      // If the date is found,
      if (occurs >= 0) {
        // append the current schedule to its list of schedules.
        o[occurs].schedule = o[occurs].schedule.concat(...cur.schedule);

        // Otherwise,
      } else {
        // add the current item to o (but make sure the schedule is an array).
        const obj = {
          date: cur.date,
          schedule: [...cur.schedule],
        };
        o = o.concat([obj]);
      }

      return o.sort((a,b) => new Date(a.date) - new Date(b.date));
    }, []);

    const maxDate = Math.max.apply(null, dataLimit);
    const normalizeMaxDate = new Date(maxDate).toISOString().split("T")[0];
    const normalizeDiasSemana = [...new Set(diasSemana)];

    sendSuccess({
      response,
      data: {
        diasSemana: normalizeDiasSemana,
        schedules: normalizeSchedule,
        dataMaxima: dataLimite && isDateBigger(dataLimite, normalizeMaxDate),
      },
      status: 200,
      message: SUCCESS_GET_MESSAGE,
    });
  } catch (error) {
    console.log("ERROR ->", error);
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
  getUsuarioAgenda,
  createUsuarioHorario,
  updateUsuarioHorario,
  deleteUsuarioHorario,
  getUsuarioHorario,
  getUsuariosHorarios,
  getUsuarioHorariosFracionados,
  deleteUsuarioHorarioFracionado,
};