import { LexModelBuildingService } from "aws-sdk";
import { sequelize, errata_paciente, usuarios } from "../models";

function getPepInformationFiltered(idUsuario) {
  const query = `
  SELECT 
  aic.id as id, 
  aic.id_agendamento as id_agendamento, 
  aic.informacao as informacao, 
  aic.data_hora_criacao as data_hora_criacao, 
  aic.tipo as tipo,
  aic.arquivos,
  COALESCE(aic.id_usuario, a.id_paciente) as id_usuario,
  COALESCE(aic.id_profissional, u.id) as id_profissional, 
  u.nome as nome_profissional from agendamentos_informacoes_complementares aic
  LEFT JOIN agendamentos a
  ON aic.id_agendamento = a.id
  LEFT OUTER JOIN usuarios u 
  ON  a.id_profissional = u.id OR aic.id_profissional = u.id
    WHERE a.id_paciente = ${idUsuario}
    OR aic.id_usuario = ${idUsuario}
  ORDER BY aic.data_hora_criacao DESC
    `;

  const config = {
    nest: true,
    type: sequelize.QueryTypes.SELECT,
  };

  return sequelize.query(query, config);
}

async function saveErrataContent(req, res) {


  const { id_user, errata, id_informacoes_complementares, id_profissional, profissional } = req.body;

  const create = await errata_paciente.create( {
    id_user,
    errata,
    id_informacoes_complementares,
    id_profissional,
    profissional
  })

  res.sendStatus(200);


  
}

async function getErrataContent(req, res) {
  const { id } = req.params;

  const queryErrata = await errata_paciente
    .findAll({
      where: {
        id_informacoes_complementares: id,
      }
    });

    res.send(queryErrata);
}

export default {
  getPepInformationFiltered,
  saveErrataContent,
  getErrataContent,
};
