import { sequelize, usuarios_especialidades } from "../models";

async function createUsuarioEspecialidade(request) {
  return usuarios_especialidades.create(request);
}

async function getUsuarioEspecialidades(request) {
  if (!request.id_usuario) request.id_usuario = 0;
  if (!request.id_especialidade) request.id_especialidade = 0;

  return sequelize.query(
    `
      select ue.*,
       e.nome as nome,
       u.nome as nomeusuario
       from "usuarios_especialidades" ue
        left join especialidades e on
        ue.id_especialidade = e.id
        left join usuarios u on
        ue.id_usuario = u.id
      where (ue.id_usuario = ${Number(
        request.id_usuario
      )} OR ue.id_especialidade = ${Number(request.id_especialidade)})
      and ue.id_ambiente = '${request.id_ambiente}'
      `,
    {
      nest: true,
      type: sequelize.QueryTypes.SELECT,
    }
  );
}

async function getUsuarioEspecialidade(id) {
  return sequelize.query(
    ` SELECT ue.*,
        e.nome as tipo 
        FROM usuarios_especialidades ue
        INNER JOIN especialidades e
        ON ue.id_especialidade = e.id
      where ue.id = ${id}
      `,
    {
      nest: true,
      type: sequelize.QueryTypes.SELECT,
      plain: true,
    }
  );
}

async function updateUsuarioEspecialidade(id, data) {
  return usuarios_especialidades.update(data, {
    where: {
      id,
    },
  });
}

async function deleteUsuarioEspecialidade(id) {
  return usuarios_especialidades.destroy({
    where: {
      id,
    },
  });
}

export default {
  createUsuarioEspecialidade,
  deleteUsuarioEspecialidade,
  getUsuarioEspecialidade,
  getUsuarioEspecialidades,
  updateUsuarioEspecialidade,
};
