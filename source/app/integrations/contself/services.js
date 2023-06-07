/* eslint-disable no-console */
/* eslint-disable camelcase */

import fetch from 'node-fetch';
import { removeSpecialCharacters } from '../../../utilities/utils';

import moment from 'moment';

import agendamentoService from '../../services/conselhos';

import service from '../../services/configuracoes';

async function pagamento({
  id_ambiente,
  paciente,
  profissional,
  cartaocodigoseguranca,
  cartaonome,
  cartaonumero,
  cartaovencimento,
  ip,
  identificator,
  valor = 0,
  agendamento
}) {

  const TOKEN_PAGAMENTO = process.env[`${id_ambiente}_CONTSELF`.toUpperCase()];
  const CHAVE_PESSOA = process.env[`${id_ambiente}_CONTSELF_CHAVE_PESSOA`.toUpperCase()];
  const URL_PAGAMENTO = `http://app.contself.com.br/ApiEcommerce/SolicitaPagamentoTransparente?ChavePessoa=${CHAVE_PESSOA}&chaveERP=veksti/${identificator}`;

  const configAmbiente = await service.getAmbiente(id_ambiente);

  
  const { configs } = configAmbiente.configuracoes;
  const conselhorProfissional = await agendamentoService.getConselho(profissional.conselho);


  if(!configs || !configs.payment) return { erro : 'Nenhuma configuração de ambiente sobre pagamento' }


  const split = [];

  (configs.payment.split.medic > 0 && profissional.cnpj) && split.push({
    EmiteNotaOurecibo: !!configs.payment.emitirNotaFiscal ? 1 : 0,
    Identificador: removeSpecialCharacters(profissional.cnpj) || null,
    descricaoServico: profissional.descricao_nota || null,
    ValorDivisao: (valor * configs.payment.split.medic / 100) || 0,
  });

  (configs.payment.split.company > 0) && split.push({
    EmiteNotaOurecibo: !!configs.payment.emitirNotaFiscal ? 1 : 0,
    Identificador: configs.payment.CNPJ,
    descricaoServico: `REFERENTE A - ${!!profissional.descricaoServico ? profissional.descricaoServico : 'Consulta'} com ${profissional.titulo} ${profissional.nome} - ${agendamento.especialidade} - ${conselhorProfissional.nome}-${profissional.uf_conselho} ${profissional.numero_conselho} em ${moment(agendamento.data_hora).format('DD/MM/YY HH:mm')}`,
    ValorDivisao: !!profissional.cnpj ? (valor * configs.payment.split.company / 100) : (valor * (configs.payment.split.company + configs.payment.split.medic) / 100),
  });

  (configs.payment.split.intermediary > 0) && split.push({
    EmiteNotaOurecibo: !!configs.payment.emitirNotaFiscal ? 1 : 0,
    Identificador:  `REFERENTE A - ${!!profissional.descricaoServico ? profissional.descricaoServico : 'Consulta'} com ${profissional.titulo} ${profissional.nome} - ${agendamento.especialidade} - ${conselhorProfissional.nome}-${profissional.uf_conselho} ${profissional.numero_conselho} em ${moment(agendamento.data_hora).format('DD/MM/YY HH:mm')}`,
    descricaoServico: null,
    ValorDivisao: (valor * configs.payment.split.intermediary / 100) || 0,
  })


  /* MONTA O CORPO DA REQUISIÇÃO NECESSÁRIA PARA O PAGAMENTO */
  const body = {
    Bairro: paciente.bairro || null,
    Cep: removeSpecialCharacters(paciente.codigo_postal) || null,
    Cidade: paciente.cidade || null,
    Email: paciente.email || null,
    Identificador: removeSpecialCharacters(paciente.cpf) || null,
    ListaDivisao: split,
    Logradouro: paciente.endereco || null,
    Nome: paciente.nome || null,
    Numero: paciente.numero || null,
    NumeroParcela: 1,
    PermitePagamentoBoleto: 0,
    PermitePagamentoCartao: 1,
    PermitePagamentoDebito: 0,
    Telefone: removeSpecialCharacters(paciente.celular || paciente.telefone) || null,
    TokenizaCartao: 0,
    UF: paciente.uf || null,
    Valor: valor || 0,
    // Valor: 1,
    cartaocodigoseguranca,
    cartaonome,
    cartaonumero,
    cartaovencimento,
    chaveERP: `veksti/${identificator}`,
    ipPagamento: ip,
  };

  const CONFIG = {
    body: JSON.stringify(body),
    headers: {
      Authorization:
        `Basic ${TOKEN_PAGAMENTO}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  };

  console.log('\n\n');
  console.log(body);

  const response = await fetch(URL_PAGAMENTO, CONFIG);
  const json = await response.json();
  return json;
}

async function estorno({ chaveERP, id_ambiente }) {
  const TOKEN_PAGAMENTO = process.env[`${id_ambiente}_CONTSELF`.toUpperCase()];
  const CHAVE_PESSOA = process.env[`${id_ambiente}_CONTSELF_CHAVE_PESSOA`.toUpperCase()];
  const URL_ESTORNO = `http://app.contself.com.br/ApiEcommerce/CancelaPagamento?ChavePessoa=${CHAVE_PESSOA}&ChaveERP=${chaveERP}`;
  const CONFIG = {
    headers: {
      Authorization:
        `Basic ${TOKEN_PAGAMENTO}`,
        'Content-Type': 'application/json',
    },
  };

  const response = await fetch(URL_ESTORNO, CONFIG);
  const json = await response.json();
  return json;
}

export default {
  estorno,
  pagamento,
};
// 