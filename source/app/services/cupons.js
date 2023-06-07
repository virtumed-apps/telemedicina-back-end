import { cupons, sequelize } from '../models';

async function createCupom(request) {
  return cupons.create(request);
}

async function getCupons({ id_ambiente }) {
  return sequelize.query(
    /* sql */`
     SELECT 
      c.id, 
      c.id_ambiente, 
      c.cupom, 
      c.desconto, 
      c.expiracao,
      c.data_hora_criacao, 
      c.data_hora_atualizacao, 
      c.quantidade_maxima_uso,
      c.desabilitado,
     COUNT(cu.id) as quantidade_uso
     FROM public.cupons c
     LEFT JOIN public.cupons_usuarios cu
     ON cu.id_cupom = c.id
     WHERE c.id_ambiente = '${id_ambiente}'
     GROUP BY c.id
      `,
    {
      nest: true,
      type: sequelize.QueryTypes.SELECT,
    },
  );
}

async function getCupom(id) {
  return cupons.findOne({
    where: {
      id,
    },
  });
}

async function getCupomByCode({ id, id_ambiente }) {
  return sequelize.query(
    /* sql */`
     SELECT 
      c.id, 
      c.id_ambiente, 
      c.cupom, 
      c.desconto, 
      c.expiracao,
      c.data_hora_criacao, 
      c.data_hora_atualizacao, 
      c.desabilitado,
      c.quantidade_maxima_uso,
     COUNT(cu.id) as quantidade_uso
     FROM public.cupons c
     LEFT JOIN public.cupons_usuarios cu
     ON cu.id_cupom = c.id
     WHERE c.cupom = '${id}'
     AND c.id_ambiente = '${id_ambiente}'
     GROUP BY c.id
      `,
    {
      type: sequelize.QueryTypes.SELECT,
      plain: true,
    },
  );
}

async function updateCupom(id, data) {
  return cupons.update(data, {
    where: {
      id,
    },
  });
}

async function deleteCupom(id) {
  return cupons.destroy({
    where: {
      id,
    },
  });
}

export default {
  getCupomByCode,
  createCupom,
  deleteCupom,
  getCupom,
  getCupons,
  updateCupom,
};
