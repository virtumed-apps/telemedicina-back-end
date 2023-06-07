/* eslint-disable global-require */

import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import ical from 'ical-generator';
import moment from 'moment';
import { dateFromJSFormat, formatToGoogle } from './date';
import emailService from '../app/services/emailsEnviados';
import emailProfissional from '../email/templates/emailProfissional';
import usuarioService from '../app/services/usuarios';
import agendamentoService from '../app/services/agendamentos';
import configuracoes from '../app/services/configuracoes';
import usuariosEspecialidadesService from '../app/services/usuariosEspecialidades';

const ses = new aws.SES({
  apiVersion: '2010-12-01',
  region: 'sa-east-1',
});

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

export const sendEmailWithAttachment = async ({
  subject,
  paciente,
  datetime,
  url,
  celularPaciente,
  profissional,
  data,
  emailsMultiplosUsuarios,
  especialidade,
  ccAddresses,
  logo,
  emailPaciente,
  email,
  limit,
}) => {
  const calendar = ical({
    name: `Atendimento via telemedicina - ${paciente}`,
    method: 'REQUEST',
    scale: 'GREGORIAN',
    prodId: '//Veksti//Veksti Telemedicina//EN',
  });

  calendar.createEvent({
    start: moment(datetime),
    end: moment(datetime).add(Number(limit), 'minutes'),
    summary: `Agendamento de telemedicina com ${
      emailPaciente ? profissional : paciente
    }`,
    transparency: 'OPAQUE',
    attendees: [
      {
        type: 'INDIVIDUAL',
        email,
        mailto: email,
        status: 'NEEDS-ACTION',
        rsvp: true,
        role: 'REQ-PARTICIPANT',
      },
    ],
    organizer: process.env.SENDER_EMAIL_ADDRESS,
    url,
  });

  await transporter.sendMail(
    {
      from: process.env.SENDER_EMAIL_ADDRESS,
      to: email,
      subject,
      cc: ccAddresses,
      html: emailProfissional({
        data,
        celularPaciente,
        paciente,
        especialidade,
        profissional,
        url,
        emailsMultiplosUsuarios,
        logo,
        emailPaciente,
      }),
      icalEvent: {
        method: 'request',
        content: calendar.toString(),
      },
    },
    (err) => {
      if (err) return console.log('err envio ->', err);
    },
  );
};

export const sendEmail = async (parameters = {}) => {
  const { email } = require('sendemail');

  return new Promise((resolve, reject) => {
    email(parameters.template, parameters, async (error) => {
      emailService
        .createEmailEnviado({
          id_ambiente: parameters.ambiente,
          corpo: parameters.template,
          destinatario: parameters.email?.toString(),
          remetente: process.env.SENDER_EMAIL_ADDRESS,
          tipo: parameters.subject,
          id_agendamento: parameters.id_agendamento,
          status: error ? 'ERRO' : 'SUCESSO',
        })
        .then(() => resolve())
        .catch((failure) => reject(failure));

      if (error) {
        console.log('ERROR EMAIL ->', error);
        reject(error);
      }
    });
  });
};

/* ================================== ANTIGOS ===================================== */
export const sendForgotPasswordEmail = async (
  ambientName,
  recipientName,
  recipientEmail,
  resetPasswordLink,
) => {
  const forgotPasswordEmail = {
    email: recipientEmail,
    name: recipientName,
    link: resetPasswordLink,
    subject: `${ambientName} - Redefinição de Senha`,
  };

  const sendemail = require('sendemail');

  const { email } = sendemail;

  email('forgot-password', forgotPasswordEmail, (error, result) => {
    console.log(error);
    console.log(result);
  });
};

export const sendConfirmationEmail = async (
  ambientName,
  recipientName,
  recipientEmail,
  logotipo,
) => {

  console.log('Response template ->', ambientName, recipientName, recipientEmail, logotipo);

  let subject = 'Bem-vindo(a) ';
  subject = `${subject} à ${ambientName}!`;

  const url = `https://${ambientName}.virtumed.com.br`;

  const props = {
    email: recipientEmail,
    name: recipientName,
    subject,
    url,
    logotipo,
  };

  const sendemail = require('sendemail');

  const { email } = sendemail;

  const template = 'confirmacao-conta';

  email(template, props, (error, result) => {
    console.log('Mail', error);
    console.log(result);
  });

  await emailService.createEmailEnviado({
    id_ambiente: ambientName,
    corpo: template,
    destinatario: recipientEmail,
    remetente: process.env.SENDER_EMAIL_ADDRESS,
    tipo: subject,
  });
};

export const sendAgendamentoEmail = async (
  ambientName,
  recipientName,
  recipientEmail,
  status,
  data,
  profissional,
  idAgendamento,
) => {
  const subject = status && status.includes('cancelado')
    ? 'Cancelamento do agendamento'
    : 'Agendamento';

  const props = {
    email: recipientEmail,
    name: recipientName,
    subject: `${ambientName} - ${subject}`,
    data,
    data_gmail: `${formatToGoogle(data).replace(' ', 'T')}Z`,
    profissional,
  };

  const sendemail = require('sendemail');

  const { email } = sendemail;

  const template = subject === 'Cancelamento' ? 'agendamento-cancelamento' : 'agendamento';

  email(template, props, (error, result) => {
    console.log('Mail', error);
    console.log(result);
  });

  await emailService.createEmailEnviado({
    id_ambiente: ambientName,
    corpo: JSON.stringify({
      template,
      props,
    }),
    destinatario: recipientEmail,
    id_agendamento: idAgendamento,
    remetente: process.env.SENDER_EMAIL_ADDRESS,
    tipo: subject,
  });
};

export default async function sendProfessionalConfirmationEmail(idAgendamento) {
  const agendamento = await agendamentoService.getAgendamento(idAgendamento);
  const ambiente = await configuracoes.getAmbiente(agendamento.id_ambiente);
  const [paciente, profissional] = [
    await usuarioService.getUsuario(agendamento.id_paciente),
    await usuarioService.getUsuario(agendamento.id_profissional),
  ];
  const especialidade = await usuariosEspecialidadesService.getUsuarioEspecialidade(
    agendamento.id_especialidade,
  );
  await sendEmailWithAttachment({
    subject: `${agendamento.id_ambiente} - Confirmação de atendimento via telemedicina - ${paciente.nome}`,
    ambiente: agendamento.id_ambiente,
    template: 'email-profissional',
    email: [profissional.email],
    // email: ['saamfps@gmail.com'],
    ccAddresses: ['samuel@veksti.com', 'atendimento@animare.med.br'],
    data: dateFromJSFormat(agendamento.data_hora),
    datetime: agendamento.data_hora,
    celularPaciente: paciente.celular,
    profissional: profissional.nome,
    profissionalEmail: profissional.email,
    especialidade: especialidade.tipo,
    paciente: paciente.nome,
    logo:
      ambiente?.configuracoes?.logotipo_png
      || ambiente?.configuracoes?.logotipo,
    url: `${agendamento.id_ambiente}.telemedicina.veksti.com/profissional/consulta/${agendamento.id_consulta}`,
  });
}
