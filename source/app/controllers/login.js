import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { sendForgotPasswordEmail } from '../../utilities/email';
import logger from '../../utilities/logger';
import { sendError, sendSuccess } from '../../utilities/response';
import { generateToken, getAmbientURL } from '../../utilities/utils';
import service from '../services/login';
import usuariosRecuperacoesSenhaService from '../services/usuariosRecuperacoesSenha';

async function loginUser(request, response) {
  try {
    const user = await service.login({ ...request.custom });

    const validPassword = user ? await bcrypt.compare(request.body.senha, user.senha) : false;
    
    console.log('\n\n user', user);
    if (!user || !validPassword) {
      return sendError({
        response,
        status: 401,
        message: 'Usuário e/ou senha inválidos',
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id,
      },
      process.env.JWT_SECRET || 'jwtsecret',
      {
        expiresIn: 15,
      },
    );


    

    return sendSuccess({
      response,
      status: 201,
      message: 'Login efetuado com sucesso!',
      data: {
        token,
        user: {
          ...user,
          role: user.perfil_acesso,
        },
      },
    });
  } catch (error) {
    logger.error(error);

    return sendError({
      response,
      status: 400,
      error,
      message: error.message,
    });
  }
}

async function forgotPassword(request, response) {
  try {
    const user = await service.login({ ...request.custom });

    const token = generateToken(user.id);

    await usuariosRecuperacoesSenhaService.createUsuarioRecuperacaoSenha({
      data_hora_expiracao: DateTime.local().plus({ hours: 24 }),
      id_ambiente: request.custom.id_ambiente,
      id_usuario: user.id,
      token,
    });

    const ambientURL = getAmbientURL(request.custom.id_ambiente);

    const resetPasswordLink = `${ambientURL}/redefinir-senha?token=${token}`;

    sendForgotPasswordEmail(
      request.custom.id_ambiente,
      user.nome,
      user.email,
      resetPasswordLink,
    );

    return sendSuccess({
      message: 'Link para redefinição de senha enviado com sucesso!',
      response,
      status: 200,
    });
  } catch (error) {
    logger.error(error);

    return sendError({
      error,
      message: error.message,
      response,
      status: 400,
    });
  }
}

export default {
  loginUser,
  forgotPassword,
};
