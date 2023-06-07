import { conselhos, sequelize } from '../models';

async function createConselho(request) {
  return conselhos.create(request);
}

async function getConselhos(request) {
  return sequelize.query(
    /* sql */`
      SELECT c.*,
      CASE WHEN count(uc) = 0 THEN '[]' 
      ELSE JSON_AGG(json_build_object('conselho', c, 'conselho_usuario', uc, 'profissional', u)) 
      END AS profissionais
      FROM conselhos c
      LEFT JOIN usuarios_conselhos uc ON c.id = uc.id_conselho
      LEFT JOIN usuarios u ON uc.id_usuario = u.id
      WHERE c.id_ambiente = '${request.id_ambiente}'
      GROUP BY c.id
    `,
    {
      nest: true,
      type: sequelize.QueryTypes.SELECT,
    },
  );
}

async function getConselho(id) {
  return sequelize.query(
    /* sql */`
      SELECT c.*,
      CASE WHEN count(uc) = 0 THEN '[]' 
      ELSE JSON_AGG(json_build_object('conselho', c, 'conselho_usuario', uc, 'profissional', u)) 
      END AS profissionais
      FROM conselhos c
      LEFT JOIN usuarios_conselhos uc ON c.id = uc.id_conselho
      LEFT JOIN usuarios u ON uc.id_usuario = u.id
      WHERE c.id = '${id}'
      GROUP BY c.id
    `,
    {
      plain: true,
      type: sequelize.QueryTypes.SELECT,
    },
  );
}

async function updateConselho(id, data) {
  return conselhos.update(data, {
    where: {
      id,
    },
  });
}

async function deleteConselho(id) {
  return conselhos.destroy({
    where: {
      id,
    },
  });
}

export default {
  createConselho,
  deleteConselho,
  getConselho,
  getConselhos,
  updateConselho,
};
