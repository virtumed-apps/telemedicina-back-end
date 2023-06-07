/* eslint-disable camelcase */

import usuarioService from '../services/usuarios';
import usuariosIntegracoes from '../services/usuariosIntegracoes';
import usuariosConselhosService from '../services/usuariosConselhos';
import MemedService from '../integrations/memed/services';
import { sendSuccess, sendError } from '../../utilities/response';

async function integrarUsuarioMemed(request, response) {
  try {
    /**
     * @param {number} id_usuario - Identificador do usuario.
     */

    const { id_usuario } = request.body;
    const { id_ambiente } = request.custom;

    // BUSCA USUÁRIO
    const usuario = await usuarioService.getUsuario(id_usuario);

    /* VALIDA SE EXISTE ALGUM USUARIO COM ESSE IDENTIFICADOR */
    if (!usuario) {
      sendError({
        response,
        status: 404,
        message: 'Não existe nenhum usuário com esse identificador!',
      });
      return;
    }

    // VALIDA SE USUÁRIO PERTENCE AO CRM
    // BUSCAR CONSELHOS USUÁRIOS- DEPOIS AJUSTAR PARA BUSCAR DO CONSELHO DA MEMED.
    const usuarioConselho = await usuariosConselhosService.getUsuarioConselhoByIdUsuario(id_usuario);

    if (!usuarioConselho) {
      sendError({
        response,
        status: 412, // ver real status
        message: 'Não existe nenhum conselho vinculado a este usuário!',
      });
      return;
    }

    // GERAR O EXTERNAL_ID - ID_USUARIO +  CRM +
    const external_id = `VKST-${usuario.id}-${usuarioConselho.numero}`;

    const [nomeUsuario, ...nomeCompleto] = usuario.nome.split(' ');

    const sobrenome = nomeCompleto.toString().replace(',', ' ');

    /* CHAMAR A INTEGRAÇÃO */
    const responseMemed = await MemedService.usuarios({
      external_id,
      nome: nomeUsuario,
      sobrenome,
      data_nascimento: usuario.data_nascimento,
      cpf: usuario.cpf,
      email: usuario.email,
      uf: usuario.uf,
      sexo: usuario.sexo?.toUpperCase().charAt(0),
      crm: +usuarioConselho.numero,
    });

    if (responseMemed.errors) {
      sendError({
        response,
        status: 400,
        message: `Ocorreu um erro ao integrar com a Memed! ${JSON.stringify(responseMemed)}`,
      });
      return;
    }

    // GRAVAR O EXTERNAL_ID NO BANCO
    const usuarioIntegracao = await usuariosIntegracoes.createUsuariosIntegracao({
      id_usuario,
      id_ambiente,
      id_integracao: responseMemed.data.id,
      external_id,
      valor: responseMemed.data.attributes.token,
    });

    sendSuccess({
      response,
      status: 201,
      message: 'Usuário integrado com sucesso!',
      data: usuarioIntegracao,
    });
  } catch (error) {
    console.log("error", error);
    sendError({
      response,
      status: 400,
      error,
      message: error.message,
    });
  }
}

async function obterPrescricaoMemed(request, response) {
  try {
    /**
     * @param {number} id - Identificador da prescricao.
     */

    const { id } = request.params;

    /* CHAMAR A INTEGRAÇÃO */
    const responseMemed = await MemedService.prescricoes({
      id,
    });

    if (responseMemed.errors){
      sendError({
        response,
        status: 400,
        message: `Ocorreu um erro ao obter a prescrição no endpoing da Memed! ${JSON.stringify(responseMemed)}`,
      });
      return;
    }
    
    sendSuccess({
      response,
      status: 200,
      message: 'Prescrição encontrada com sucesso!',
      data: responseMemed,
    });
  } catch (error) {
    sendError({
      response,
      status: 400,
      error,
      message: error.message,
    });
  }
}

async function obterUsuario(request, response) {
  try {
    /**
     * @param {number} id - Identificador da prescricao.
     */
    const { id } = request.params;
    const { id_ambiente } = request.custom;

    // BUSCA USUÁRIO
    const usuario = await usuarioService.getUsuario(id);

    /* VALIDA SE EXISTE ALGUM USUARIO COM ESSE IDENTIFICADOR */
    if (!usuario) {
      sendError({
        response,
        status: 404,
        message: 'Não existe nenhum usuário com esse identificador!',
      });
      return;
    }

    // // VALIDA SE USUÁRIO PERTENCE AO CRM
    // // BUSCAR CONSELHOS USUÁRIOS- DEPOIS AJUSTAR PARA BUSCAR DO CONSELHO DA MEMED.
    // const usuarioConselho = await usuariosConselhosService.getUsuarioConselhoByIdUsuario(id);

    /* CHAMAR A INTEGRAÇÃO */
    const responseMemed = await MemedService.getUsuario({ cpf: usuario.cpf });

    const usuarioIntegracao = await usuariosIntegracoes.createUsuariosIntegracao({
      id_usuario: id,
      id_ambiente,
      id_integracao: responseMemed.data.id,
      external_id: responseMemed.id,
      valor: responseMemed.data.attributes.token,
    });

    if (responseMemed.errors) {
      sendError({
        response,
        status: 400,
        message: `Ocorreu um erro ao obter a prescrição no endpoing da Memed! ${JSON.stringify(responseMemed)}`,
      });
      return;
    }

    sendSuccess({
      response,
      status: 201,
      message: 'Usuário integrado com sucesso!',
      data: usuarioIntegracao,
    });
  } catch (error) {
    sendError({
      response,
      status: 400,
      error,
      message: error.message,
    });
  }
}

export default {
  integrarUsuarioMemed,
  obterPrescricaoMemed,
  obterUsuario,
};
