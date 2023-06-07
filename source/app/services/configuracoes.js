import { functionsIn } from "lodash";
import { ambientes, ambientes_termos, ambientes_anamnese, ambientes_termos_teleconsulta} from "../models";

async function getAmbiente(id_ambiente) {
  return await ambientes.findOne({
    where: {
      id_ambiente,
    },
  });
}

async function updateConfig(id_ambiente, data) {
  return ambientes.update(data, {
    where: {
      id_ambiente,
    },
  });
}

async function getAmbienteTermos(id_ambiente) {
  return await ambientes_termos.findOne({
    where: {
      id_ambiente
    },
    order: [ [ 'id', 'DESC' ]],
    limit: 1
  })
}

async function createAmbienteTermos(data) {
  return ambientes_termos.create(data);
}

function destroyAmbienteAnamnese(id_ambiente) {
  return ambientes_anamnese.destroy({
    where: { 
      id_ambiente
    }
  });
}

function bulkCreateAmbienteAnamnese(data) {
  return ambientes_anamnese.bulkCreate(data);
}

async function getAmbienteAnamnese(id_ambiente) {
  return ambientes_anamnese.findAll({
    where: {
      id_ambiente
    }
  })
}

async function getAmbienteTermosTeleconsulta(id_ambiente){
  return await ambientes_termos_teleconsulta.findOne({
    where: {
      id_ambiente,
    },
    order: [ [ 'id', 'DESC' ]],
    limit: 1
  })
}

async function createAmbienteTermoTeleconsulta(data){
  return ambientes_termos_teleconsulta.create(data);
}

export default {
  getAmbiente,
  createAmbienteTermos,
  getAmbienteTermos,
  updateConfig,
  bulkCreateAmbienteAnamnese,
  destroyAmbienteAnamnese,
  getAmbienteAnamnese,
  createAmbienteTermoTeleconsulta,
  getAmbienteTermosTeleconsulta
};
