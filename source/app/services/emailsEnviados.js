import { QueryTypes } from 'sequelize';
import { sequelize, emails_enviados } from '../models';

async function createEmailEnviado(request) {
  return emails_enviados.create(request);
}

async function getEmailsEnviados(request) {
  const { id_ambiente, destinatario } = request;

  return sequelize.query(
    `select *
    from 
      emails_enviados
    where 
      id_ambiente='${id_ambiente}' 
    and 
      destinatario='${destinatario}'`,
    {
      nest: true,
      type: QueryTypes.SELECT,
    },
  );
}

async function getEmailEnviado(id) {
  return emails_enviados.findOne({
    where: {
      id,
    },
  });
}

async function updateEmailEnviado(id, data) {
  return emails_enviados.update(data, {
    where: {
      id,
    },
  });
}

async function deleteEmailEnviado(id) {
  return emails_enviados.destroy({
    where: {
      id,
    },
  });
}

export default {
  createEmailEnviado,
  deleteEmailEnviado,
  getEmailEnviado,
  getEmailsEnviados,
  updateEmailEnviado,
};
