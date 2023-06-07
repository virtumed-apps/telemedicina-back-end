import { usuarios_recuperacoes_senhas } from '../models';

async function createUsuarioRecuperacaoSenha(request) {
  return usuarios_recuperacoes_senhas.create(request);
}

async function getUsuariosRecuperacoesSenhas(request) {
  return usuarios_recuperacoes_senhas.findAll(request);
}

async function getUsuarioRecuperacaoSenha(token) {
  return usuarios_recuperacoes_senhas.findOne({
    where: {
      token,
    },
  });
}

async function updateUsuarioRecuperacaoSenha(id, data) {
  return usuarios_recuperacoes_senhas.update(data, {
    where: {
      id,
    },
  });
}

async function deleteUsuarioRecuperacaoSenha(token) {
  return usuarios_recuperacoes_senhas.destroy({
    where: {
      token,
    },
  });
}

export default {
  createUsuarioRecuperacaoSenha,
  deleteUsuarioRecuperacaoSenha,
  getUsuarioRecuperacaoSenha,
  getUsuariosRecuperacoesSenhas,
  updateUsuarioRecuperacaoSenha,
};
