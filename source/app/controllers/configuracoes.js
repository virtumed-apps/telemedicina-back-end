import service from "../services/configuracoes";
import logger from "../../utilities/logger";
import { sendSuccess, sendError } from "../../utilities/response";

async function getAmbiente(request, response) {
  try {
    const ambiente = await service.getAmbiente(request.custom.id_ambiente);

    if (ambiente) return sendSuccess({ response, status: 200, data: ambiente });

    return sendError({
      response,
      status: 404,
      message: "Nenhum ambiente encontrado",
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

async function updateConfig(request, response) {
  try {
    const ambiente = await service.getAmbiente(request.params.id_ambiente);
    if (ambiente) {
      const ambienteConfig = await service.updateConfig(
        request.params.id_ambiente,
        request.body
      );
      return sendSuccess({ response, status: 200, data: ambienteConfig });
    }

    return sendError({
      response,
      status: 404,
      message: "Nenhum ambiente encontrado",
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

async function getAmbienteTermos(request, response) {
  try{
    const termos = await service.getAmbienteTermos(request.custom.id_ambiente);

    if (termos) return sendSuccess({ response, status: 200, data: termos });

    return sendError({
      response,
      status: 404,
      message: "Termos não cadastrados",
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

async function createAmbienteTermos(request, response) {
  try{
    const create = await service.createAmbienteTermos({
      id_ambiente: request.custom.id_ambiente,
      ...request.body
    });

    return sendSuccess({ response, status: 200, data: create });

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

async function bulkCreateAmbienteAnamnese(request, response) {
  try{
    await service.destroyAmbienteAnamnese(request.custom.id_ambiente);

    const create = await service.bulkCreateAmbienteAnamnese(request.body);
    return sendSuccess({ response, status: 200, data: create });
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


async function getAmbienteAnamnese(request, response) {
  try{
    const anamnese = await service.getAmbienteAnamnese(request.custom.id_ambiente);
    if (anamnese) return sendSuccess({ response, status: 200, data: anamnese });

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

async function deleteAmbienteAnamnese(request, response) {
  try{
    const destroy = await service.destroyAmbienteAnamnese(request.custom.id_ambiente);

    return sendSuccess({ response, status: 200, data: destroy });
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

async function getAmbienteTermosTeleconsulta(request, response){
  try {
    const termos_teleconsulta = await service.getAmbienteTermosTeleconsulta(request.custom.id_ambiente);

    if(termos_teleconsulta) return sendSuccess({response, status: 200, data: termos_teleconsulta})

    return sendError({
      response,
      status: 404,
      message: 'Termos de teleconsulta não cadastrados'
    })

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

async function createAmbienteTermoTeleconsulta(request, response){
  console.log(request.custom)
  try {
    const create = await service.createAmbienteTermoTeleconsulta(request.custom);
    
    return sendSuccess({ response, status: 200, data: create });

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
  getAmbiente,
  createAmbienteTermos,
  getAmbienteTermos,
  updateConfig,
  bulkCreateAmbienteAnamnese,
  deleteAmbienteAnamnese,
  getAmbienteAnamnese,
  createAmbienteTermoTeleconsulta,
  getAmbienteTermosTeleconsulta
};
