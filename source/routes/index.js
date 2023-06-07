import healthRoutes from './health';
import validationRoutes from './validation';
import configuracoesRoutes from './configuracoes';
import conveniosRoutes from './convenios';
import agendamentosRoutes from './agendamentos';
import usuariosRoutes from './usuarios';
import loginRoutes from './login';
import usuarioConselhoRoutes from './usuarioConselho';
import usuariosConvenioRoutes from './usuariosConvenio';
import usuariosEspecialidadesRoutes from './usuariosEspecialidades';
import usuariosHorariosRoutes from './usuariosHorarios';
import usuariosIntegracoesRoutes from './usuariosIntegracoes';
import usuariosRecuperacoesSenhasRoutes from './usuariosRecuperacoesSenhas';
import agendamentosInformacoesComplementaresRoutes from './agendamentosInformacoesComplementares';
import especialidadesRoutes from './especialidades';
import especialidadesFiltrosRoutes from './especialidadesFiltros';
import conselhosRoutes from './conselhos';
import agendamentoTokenRoutes from './agendamentoTokens';
import pagamentoRoutes from './pagamentos';
import memedRoutes from './memed';
import emailsEnviados from './emailsEnviados';
import horariosFolgas from './horariosFolgas';
import atendimentoRoutes from './atendimento';
import pepRoutes from './pep';
import cuponsRoutes from './cupons';
import prescricoesRoutes from './prescricoes';
import nexoData from './nexoData'
import authorize from '../app/middlewares/auth';

export default function configureRouter(server) {
  server.use('/v1/validar-sessao', authorize, validationRoutes);
  server.use('/v1/convenios', authorize, conveniosRoutes);
  server.use('/v1/conselhos', authorize, conselhosRoutes);

  server.use('/v1/agendamentos', authorize, agendamentosRoutes);
  server.use(
    '/v1/agendamentos-informacoes-complementares',
    authorize,
    agendamentosInformacoesComplementaresRoutes,
  );
  server.use('/v1/usuarios', authorize, usuariosRoutes);
  server.use('/v1/usuarios-conselhos', authorize, usuarioConselhoRoutes);
  server.use('/v1/usuarios-convenios', authorize, usuariosConvenioRoutes);
  server.use(
    '/v1/usuarios-especialidades',
    authorize,
    usuariosEspecialidadesRoutes,
  );
  server.use('/v1/usuarios-integracoes', authorize, usuariosIntegracoesRoutes);
  server.use('/v1/especialidades', authorize, especialidadesRoutes);
  server.use('/v1/especialidades-filtros', especialidadesFiltrosRoutes);
  server.use('/v1/agendamento-token', authorize, agendamentoTokenRoutes);
  server.use('/v1/pagamentos', authorize, pagamentoRoutes);
  server.use('/v1/memed', authorize, memedRoutes);
  server.use('/v1/cupons', authorize, cuponsRoutes);
  server.use('/v1/prescricoes', authorize, prescricoesRoutes);
  server.use('/v1/pep', authorize, pepRoutes);

  /* ROTAS SEM AUTENTICAÇÃO (CUIDADO AO RETORNAR INFORMAÇÕES DELICADAS) */
  server.use('/v1/horarios-folgas', horariosFolgas);
  server.use('/v1/emails-enviados', emailsEnviados);
  server.use(
    '/v1/usuarios-recuperacoes-senhas',
    usuariosRecuperacoesSenhasRoutes,
  );
  server.use('/v1/usuarios-horarios', usuariosHorariosRoutes);
  server.use('/v1/configuracoes', configuracoesRoutes);
  server.use('/v1/login', loginRoutes);
  server.use('/v1/health', healthRoutes);
  server.use('/v1/atendimento-usuario', atendimentoRoutes);
  server.use('/v1/horarios-folgas', horariosFolgas);

  server.use('/v1/nexodata', nexoData);
}
