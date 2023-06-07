/* eslint-disable no-console */
/* eslint-disable camelcase */

import { v4 as uuidv4 } from 'uuid';
import { dateFromJSFormat, isExpired } from '../../utilities/date';
import { sendEmail, sendEmailWithAttachment } from '../../utilities/email';
import { sendError, sendSuccess } from '../../utilities/response';
import { calcuateDiscounts } from '../../utilities/utils';
import Contself from '../integrations/contself/services';
import agendamentoService from '../services/agendamentos';
import configuracoes from '../services/configuracoes';
import cupomService from '../services/cupons';
import pagamentoService from '../services/pagamentos';
import usuarioService from '../services/usuarios';
import usuariosCuponsService from '../services/usuariosCupons';

async function pagamentoAgendamentoContself(request, response) {
  let pagamento = null;
  let agendamento_info = null;

  try {
    /**
     * @param {string} valor - Valor do atendimento à ser cobrado.
     * @param {number} id_agendamento - Identificador do atendimento.
     * @param {string} cartaocodigoseguranca - Código de segurança do cartão
     * @param {string} cartaonome - Nome do cartão
     * @param {string} cartaonumero - Número do cartão
     * @param {string} cartaovencimento - Data de vencimento do cartão
     * @param {string} ip - IP do usuário que efetuou o pagamento
     * @param {string} id_cupom_desconto - Identificador do desconto
     */

    /* BUSCA O AGENDAMENTO PELO IDENTIFICADOR */
    const agendamento = await agendamentoService.getAgendamento(
      request.body.id_agendamento,
    );

    const ambiente = await configuracoes.getAmbiente(request.headers.ambiente);

    agendamento_info = agendamento;

    /* INSTANCIA A GERAÇÃO DE LOG */
    const generateLog = async (params) => pagamentoService.createPagamento({
      id_ambiente: request.headers.ambiente,
      valor: agendamento.valor_consulta,
      id_agendamento: agendamento.id,
      ip: request.body.ip,
      gateway: 'contself',
      id_cupom_desconto: request.body.id_cupom_desconto || null,
      ...params,
    });

    /* GERA LOG DE PAGAMENTO */
    await generateLog({ tipo: 'INICIOU_PAGAMENTO' });

    /* VALIDA SE EXISTE ALGUM AGENDAMENTO COM ESSE IDENTIFICADOR */
    if (!agendamento) {
      sendError({
        response,
        status: 404,
        message: 'Não existe nenhum agendamento com esse identificador',
      });

      /* GERA LOG DE PAGAMENTO ERRO_AGENDAMENTO_INEXISTENTE */
      await generateLog({ tipo: 'ERRO_AGENDAMENTO_INEXISTENTE' });

      return;
    }

    /* BUSCA O PACIENTE/PROFISSIONAL DE ACORDO COM O RETORNO DO ATENDIMENTO */
    const [paciente, profissional] = [
      await usuarioService.getUsuario(agendamento.id_paciente),
      await usuarioService.getUsuario(agendamento.id_profissional),
    ];

    /* SE NÃO POSSUIR PACIENTE OU PROFISSIONAL */
    if (!paciente || !profissional) {
      sendError({
        response,
        status: 404,
        message: `Ocorreu um erro ao efetuar o pagamento! Entre em contato com a ${request.headers.ambiente}.`,
      });

      /* GERA LOG DE PAGAMENTO ERRO_USUARIO_INEXISTENTE */
      await generateLog({ tipo: 'ERRO_USUARIO_INEXISTENTE' });

      return;
    }

    let valor = agendamento.valor_consulta;

    /* BUSCA O CUPOM PELO IDENTIFICADOR */
    const cupom = await cupomService.getCupom(
      request.body.id_cupom_desconto || null,
    );

    if (cupom) {
      /* VERIFICA SE JÁ EXPIROU */
      const expired = isExpired(cupom.expiracao);
      /* VERIFICA SE JÁ ATINGIU O NÚMERO MÁXIMO DE USOS */
      const maxUses = Number(cupom.quantidade_uso) >= cupom.quantidade_maxima_uso;
      /* VERIFICA SE O USUÁRIO JÁ UTILIZOU O CUPOM (ANTI-FRAUDE) */
      const hasUserUsed = await usuariosCuponsService.hasUserUsed(
        cupom.id,
        agendamento.id_paciente,
      );
      /* VERIFICA SE O CUPOM ESTÁ DESABILITADO */
      const disabled = cupom.desabilitado;

      console.log({
        expired,
        maxUses,
        hasUserUsed,
        disabled,
      });

      /* VERIFICA SE O CUPOM É INVÁLIDO */
      if (hasUserUsed || disabled || expired || maxUses) {
        sendError({
          response,
          status: 400,
          message: 'Ocorreu um erro, cupom inválido!',
        });

        /* GERA LOG DE PAGAMENTO ERRO_CUPOM_UTILIZADO */
        await generateLog({ tipo: 'ERRO_CUPOM_INVALIDO' });

        return;
      }

      /* SE O DESCONTO FOR MAIOR OU IGUAL A 100%, ENCERRA O PAGAMENTO */
      if (Number(cupom.desconto) >= 100) {
        /* GERA LOG DE PAGAMENTO SUCESSO */
        await generateLog({ tipo: 'SUCESSO' });

        await usuariosCuponsService.createUsuarioCupom({
          id_agendamento: agendamento.id,
          id_usuario: paciente.id,
          id_cupom: request.body.id_cupom_desconto,
          id_ambiente: request.headers.ambiente,
        });

        await sendEmailWithAttachment({
          subject: `${request.headers.ambiente} - Confirmação de atendimento via telemedicina - ${paciente.nome}`,
          ambiente: request.headers.ambiente,
          template: 'email-profissional',
          email: [profissional.email],
          ccAddresses: ['samuel@veksti.com', 'atendimento@animare.med.br'],
          data: dateFromJSFormat(agendamento.data_hora),
          datetime: agendamento.data_hora,
          celularPaciente: paciente.celular,
          profissional: profissional.nome,
          especialidade: agendamento.especialidade,
          paciente: paciente.nome,
          logo: ambiente?.configuracoes?.logotipo_png || ambiente?.configuracoes?.logotipo,
          url: `${request.headers.ambiente}.virtumed.com.br/profissional/consulta/${agendamento.id_consulta}`,
        });

        await sendEmail({
          subject: `${request.headers.ambiente} - Confirmação de atendimento via telemedicina`,
          ambiente: request.headers.ambiente,
          template: 'schedule-confirmation',
          paciente: paciente.nome,
          email: [paciente.email],
          data: dateFromJSFormat(agendamento.data_hora, 'dd/MM/yyyy HH:mm'),
          url: `${request.headers.ambiente}.virtumed.com.br/paciente/consulta/${agendamento.id_consulta}`,
          profissional: profissional.nome,
          especialidade: agendamento.especialidade,
          logo: ambiente.configuracoes.logotipo,
        });

        /* ATUALIZA O STATUS PARA CONFIRMADO  */
        await agendamentoService.updateAgendamento(agendamento.id, {
          status: 'confirmado',
        });

        sendSuccess({
          response,
          status: 201,
          message: 'Pagamento efetuado com sucesso!',
          data: pagamento,
        });

        return;
      }

      /* SE NÃO FOR, ATRIBUI À VARIAVEL VALOR, O NOVO VALOR DO ATENDIMENTO COM O DESCONTO */
      valor = calcuateDiscounts(agendamento.valor_consulta, cupom.desconto);

      console.log('VALOR COM DESCONTO ->', valor);
    }

    /* EFETUA O PAGAMENTO */
    const payload = await Contself.pagamento({
      ...request.body,
      paciente,
      profissional,
      id_ambiente: request.headers.ambiente,
      identificator: uuidv4(),
      valor,
      agendamento
    });

    console.log(
      'PAGAMENTO',
      paciente.nome,
      new Date().toLocaleString('pt-BR'),
      JSON.stringify(payload),
    );

    /* SE O CÓDIGO DA TRANSAÇÃO FOR IGUAL A 1 */
    if (payload.codTransacaoStatus === 1) {
      pagamento = payload;

      /* GERA LOG DE PAGAMENTO SUCESSO */
      await generateLog({
        tipo: 'SUCESSO',
        response: payload,
      });

      /* SE POSSUIR CUPOM VINCULA AO USUARIO */
      if (request.body.id_cupom_desconto) {
        await usuariosCuponsService.createUsuarioCupom({
          id_agendamento: agendamento.id,
          id_usuario: paciente.id,
          id_cupom: request.body.id_cupom_desconto,
          id_ambiente: request.headers.ambiente,
        });
      }

      await agendamentoService.updateAgendamento(agendamento_info.id, {
        status: 'confirmado',
      });

      await sendEmailWithAttachment({
        subject: `${request.headers.ambiente} - Confirmação de atendimento via telemedicina - ${paciente.nome}`,
        ambiente: request.headers.ambiente,
        template: 'email-profissional',
        email: [profissional.email],
        ccAddresses: ['samuel@veksti.com', 'atendimento@animare.med.br'],
        data: dateFromJSFormat(agendamento.data_hora),
        datetime: agendamento.data_hora,
        celularPaciente: paciente.celular,
        profissional: profissional.nome,
        especialidade: agendamento.especialidade,
        paciente: paciente.nome,
        logo: ambiente?.configuracoes?.logotipo_png || ambiente?.configuracoes?.logotipo,
        url: `${request.headers.ambiente}.virtumed.com.br/profissional/consulta/${agendamento.id_consulta}`,
      });

      await sendEmail({
        subject: `${request.headers.ambiente} - Confirmação de atendimento via telemedicina`,
        ambiente: request.headers.ambiente,
        template: 'schedule-confirmation',
        paciente: paciente.nome,
        email: [paciente.email  ],
        data: dateFromJSFormat(agendamento.data_hora, 'dd/MM/yyyy '),
        horario: dateFromJSFormat(agendamento.data_hora, 'HH:mm'),
        url: `${request.headers.ambiente}.virtumed.com.br/paciente/consulta/${agendamento.id_consulta}`,
        profissional: profissional.nome,
        especialidade: agendamento.especialidade,
        logo: ambiente.configuracoes.logotipo,
      });

      sendSuccess({
        response,
        status: 200,
        message: 'Pagamento efetuado com sucesso!',
      });
      return;
    }

    /* GERA LOG DE PAGAMENTO ERRO */
    await generateLog({
      tipo: 'ERRO',
      response: payload,
    });

    await agendamentoService.updateAgendamento(agendamento_info.id, {
      status: 'cancelado',
    });

    sendError({
      response,
      status: 400,
      message:
        'Ocorreu um erro ao processar o pagamento, verifique seus dados e tente novamente',
    });
  } catch (error) {
    console.log(new Date(), 'ERROR PAGAMENTO ->', error);

    await agendamentoService.updateAgendamento(agendamento_info.id, {
      status: 'cancelado',
    });

    /* EFETUA O ESTORNO */
    if (pagamento && pagamento.solicitacao) {
      const estorno = await Contself.estorno({
        chaveERP: pagamento.solicitacao.chaveERP,
        id_ambiente: request.headers.ambiente,
      });

      /* GERA LOG DE PAGAMENTO ESTORNO */
      await pagamentoService.createPagamento({
        id_ambiente: request.headers.ambiente,
        valor: agendamento_info.valor_consulta,
        id_agendamento: agendamento_info.id,
        ip: request.body.ip,
        tipo: 'ESTORNADO',
        gateway: 'contself',
        id_cupom_desconto: request.body.id_cupom_desconto || null,
        response: pagamento,
      });

      console.log('Estorno efetuado com sucesso ->', estorno);
      return;
    }

    /* GERA LOG DE PAGAMENTO ERRO */
    await pagamentoService.createPagamento({
      id_ambiente: request.headers.ambiente,
      valor: agendamento_info.valor_consulta,
      id_agendamento: agendamento_info.id,
      ip: request.body.ip,
      tipo: 'ERROR_CORE',
      gateway: 'contself',
      id_cupom_desconto: request.body.id_cupom_desconto || null,
      response: pagamento,
    });

    sendError({
      response,
      status: 400,
      error,
      message: error.message,
    });
  }
}

export default {
  pagamentoAgendamentoContself,
};
