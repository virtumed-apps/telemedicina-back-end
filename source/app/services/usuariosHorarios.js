/* eslint-disable camelcase */
import { sequelize, usuarios_horarios } from "../models";

async function createUsuarioHorario(request) {
  return usuarios_horarios.create(request);
}

async function getUsuarioHorarios(request) {
  if (!request.id_usuario) request.id_usuario = 0;
  if (!request.id_ambiente) request.id_ambiente = "";

  return sequelize.query(
    `
      select uh.* from "usuarios_horarios" uh
      where uh.id_usuario = ${Number(request.id_usuario)}
      and uh.id_ambiente = '${request.id_ambiente}'
      `,
    {
      nest: true,
      type: sequelize.QueryTypes.SELECT,
    }
  );
}

async function getUsuarioHorariosFracionados(request, id) {
  return usuarios_horarios.findAll({
    where: {
      id_usuario: id,
    },
  });
}

async function getUsuarioHorario(id) {
  return usuarios_horarios.findOne({
    where: {
      id_usuario: id,
    },
  });
}

async function getUsuarioHorarioFracionado(id) {
  return usuarios_horarios.findOne({
    where: {
      id,
    },
  });
}

async function getUsuarioHorarioFracionadoAgenda(id) {
  return usuarios_horarios.findAll({
    where: {
      id_usuario: id,
    },
  });
}

async function updateUsuarioHorario(id, data) {
  return usuarios_horarios.update(data, {
    where: {
      id,
    },
  });
}

async function deleteUsuarioHorario(id) {
  return usuarios_horarios.destroy({
    where: {
      id,
    },
  });
}

export default {
  createUsuarioHorario,
  deleteUsuarioHorario,
  getUsuarioHorario,
  getUsuarioHorarios,
  updateUsuarioHorario,
  getUsuarioHorariosFracionados,
  getUsuarioHorarioFracionado,
  getUsuarioHorarioFracionadoAgenda,
};
