import { sequelize, usuarios } from "../models";
import { inSQL } from "../../utilities/utils";

async function createUsuario(request) {
  return usuarios.create(request);
}

async function getUsuarios(request) {

  const showAllPatients = (request.showAllPatients == "true") | false;
  let query;
  if (!!showAllPatients) {
    query = `SELECT u.*, array_agg(DISTINCT e.nome) as especialidades FROM usuarios u
        LEFT JOIN usuarios_especialidades ue
          ON ue.id_usuario = u.id
        LEFT JOIN especialidades e
          ON ue.id_especialidade = e.id
      WHERE u.id_ambiente = '${request.id_ambiente}'
      ${request.perfil_acesso === 'paciente' ? `
      AND (u.perfil_acesso = '${request.perfil_acesso}' OR u.perfil_acesso = 'profissional' OR u.perfil_acesso = 'administrador')`
        : request.perfil_acesso === 'profissional' ? ` 
          AND (u.perfil_acesso = '${request.perfil_acesso}' OR u.id = 60) 
        `
          : request.perfil_acesso
            ? `AND u.perfil_acesso = '${request.perfil_acesso}'`
            : ""
      }
      GROUP BY u.id
      ORDER BY u.nome desc
    `
  } else {
    query =
      `SELECT DISTINCT(agendamentos.id_paciente), u.* FROM agendamentos 
        LEFT JOIN usuarios as u ON u.id = agendamentos.id_paciente AND u.id_ambiente = '${request.id_ambiente}'
      WHERE agendamentos.id_profissional = ${request.userId} 
    ;`;
  }

  return await sequelize.query(query, {
    nest: true,
    type: sequelize.QueryTypes.SELECT,
  });
}

async function getUsuario(id) {
  if (!id) id = 0;

  return sequelize.query(
    `
      select
      u.*, 
      h.id as id_usuarios_horarios, 
      h.horario_inicial, 
      h.horario_final,
      h.data_limite, 
      h.dias_semana, 
      c.id_conselho as conselho,
      c.id as id_usuario_conselho,
      c.numero as numero_conselho,
      c.uf_conselho as uf_conselho
      from "usuarios" u
        left join usuarios_horarios h 
        on h.id_usuario = u.id
        left join usuarios_conselhos c 
        on c.id_usuario = u.id
      where u.id = ${Number(id)}
      limit 1
      `,
    {
      plain: true,
      type: sequelize.QueryTypes.SELECT,
    }
  );
}

async function updateUsuario(id, data) {
  console.log("aqaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaui?" ,id, data)
  return usuarios.update(data, {
    where: {
      id,
    },
  });
}

async function deleteUsuario(id) {
  return usuarios.destroy({
    where: {
      id,
    },
  });
}

async function hasFieldRegistered(field, request) {
  return usuarios.findOne({
    where: {
      [field]: request[field],
      id_ambiente: request.id_ambiente,
    },
  });
}

async function getUsuariosFiltered(request) {
  console.log('getUsuariosFiltered', request)
  const showAllPatients = (request.showAllPatients == "true") | false;
  let query;

  if (
    !!showAllPatients
    || request.acesso == 'profissional'
    || request.acesso == 'recepcionista'
    || request.acesso == 'paciente'
    || request.acesso == 'administrador'
  ) {
    query =
    /* sql */ `
    SELECT u.*, array_agg(DISTINCT e.nome) as especialidades 
    FROM usuarios u
    LEFT JOIN usuarios_especialidades ue
        ON ue.id_usuario = u.id
      LEFT JOIN especialidades e
        ON ue.id_especialidade = e.id
    WHERE LOWER(u.nome) LIKE LOWER('%${request.value}%')
    AND u.id_ambiente = '${request.id_ambiente}'
    ${request.acesso === 'paciente' ? `
      AND (u.perfil_acesso = '${request.acesso}' OR u.perfil_acesso = 'profissional' OR u.perfil_acesso = 'administrador')`
        : request.acesso === 'profissional' ? ` 
          AND (u.perfil_acesso = '${request.acesso}' OR u.id = 60) 
        `
          : request.acesso
            ? `AND u.perfil_acesso = '${request.acesso}'`
            : ""
      }

    GROUP BY u.id
    ORDER BY u.nome desc
    `;
  } else {
    query = `
      SELECT DISTINCT(agendamentos.id_paciente), u.* FROM agendamentos 
        LEFT JOIN usuarios as u ON u.id = agendamentos.id_paciente AND u.id_ambiente = '${request.id_ambiente}'
      WHERE agendamentos.id_profissional = ${request.userId} AND LOWER(u.nome) LIKE LOWER('%${request.value}%')
    `
  }

  return sequelize.query(query,
    {
      nest: true,
      type: sequelize.QueryTypes.SELECT,
    }
  );
}

export default {
  getUsuariosFiltered,
  hasFieldRegistered,
  createUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarios,
  updateUsuario,
};
