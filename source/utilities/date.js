import { DateTime } from 'luxon';

/**
 * Transforma data no formato ISO para o formato dd/MM/yyyy HH:mm:ss
 * @param date
 */
export const formatFromISO = (date) => DateTime.fromISO(date)
  .setZone('America/Sao_Paulo')
  .setLocale('pt-BR')
  .toFormat('dd/MM/yyyy HH:mm:ss');

/**
 * Transforma data para um formato desejado
 * @param date
 */
export const dateFromFormat = (date, format, output = 'dd/MM/yyyy HH:mm:ss') => DateTime.fromFormat(date, format)
  .setZone('America/Sao_Paulo')
  .setLocale('pt-BR')
  .toFormat(output);

/**
 * Transforma data para um formato desejado (a partir do formato JS)
 * @param date
 */
export const dateFromJSFormat = (date, output = 'dd/MM/yyyy HH:mm:ss') => DateTime.fromJSDate(date)
  .setZone('America/Sao_Paulo')
  .setLocale('pt-BR')
  .toFormat(output);

/**
 * Retorna data atual no formato recebido por parâmetro (o padrão é dd/MM/yyyy)
 * @param format
 */
export const currentDate = (format) => DateTime.local()
  .setZone('America/Sao_Paulo')
  .toFormat(format || 'dd/MM/yyyy');

/**
 * Retorna data atual no formato DateTime
 */
export const currentDateTime = () => DateTime.local().setZone('America/Sao_Paulo').setLocale('pt-BR');

/**
 * Retorna a data no formato DateTime
 */

export const formatToDateTime = (date, format) => DateTime.fromFormat(date, format)
  .setZone('America/Sao_Paulo')
  .setLocale('pt-BR');

/**
 * Retorna a data no formato DateTime
 */

export const formatJSToDateTime = (date) => DateTime.fromJSDate(date).setZone('America/Sao_Paulo').setLocale('pt-BR');

/**
 * Compara se a primeira data é maior que a segunda enviada
 * @param {string} start - Data inicial
 * @param {array} end - Data final
 * @return {boolean} - Se é maior ou não
 */
export const isDateBigger = (start, end) => formatToDateTime(start, 'yyyy-MM-dd').toMillis()
  > formatToDateTime(end, 'yyyy-MM-dd').toMillis();

export const isExpiredSchedule = (date) => currentDateTime().toMillis()
  > formatToDateTime(date, 'yyyy-MM-dd').toMillis();

export const isExpired = (date) => currentDateTime().toMillis()
  > formatJSToDateTime(date).toMillis();

/**
 * Retorna um range de horários
 * @param {string} end - Horário final
 * @param {array} weekDays - Dias da semana que o profissional atende
 * @return {array} - Array contendo todas as datas dentro até a data máxima selecionada
 */
export function getDateRange(end, weekDays) {
  let dates = [];
  const endDate = formatToDateTime(end, 'yyyy-MM-dd');
  let currDate = currentDateTime();

  /* ENQUANTO A DATA ATUAL FOR MENOR QUE A FINAL */
  while (currDate.toMillis() < endDate.toMillis()) {
    /* VALIDA SE OS DIAS DA SEMANA CORRESPONDEM COM OS DIAS DA SEMANA DISPONÍVEIS DO PROFISSIONAL */
    if (weekDays.includes(currDate.weekday)) {
      dates = [...dates, currDate];
    }
    /* INCREMENTA UM DIA AO CURRENT DATE */
    currDate = currDate.plus({ day: 1 });
  }

  /* SE A DATA FINAL FOR MAIOR QUE HOJE, ADICIONA A DATA FINAL NO ARRAY */
  if ((endDate.toMillis()
    > currentDateTime().toMillis()) && weekDays.includes(endDate.weekday)) dates.push(endDate);

  return [...dates];
}

/**
 * Retorna um range de horários
 * @param {string} end - Horário final
 * @param {string} start - Horário inicial
 * @param {string} duration - Duração do atendimento
 * @return {array} - Array contendo todos os horários interpolados pela duração do atendimento
 */
export function getTimeInterval(duration, start, end) {
  let times = [];
  let startTime = start;

  /* ENQUANTO O HORÁRIO DE INICIO FOR MENOR QUE O HORÁRIO FINAL */
  while (startTime.plus({ minutes: duration }).toMillis() < end.toMillis()) {
    /* ADICIONA AO ARRAY DE HORÁRIOS */
    times = [...times, startTime];
    /* INCREMENTA A DURAÇÃO DO ATENDIMENTO */
    startTime = startTime.plus({ minutes: duration });
  }

  return times;
}

/**
 * Retorna um range de horários
 * @param {array} arr - Array contendo strings de datas
 * @param {string} key - Key do objeto contendo as datas
 * @param {string} format - Formato do data data (Ex. yyyy-MM-dd)
 * @return {array} - Array contendo todas as datas no formato do Luxon
 */
export const formatArrDatesToDateTime = (arr = [], key, format, fromIso = false) => arr.map((i) => ({
  ...i,
  [key]: fromIso
    ? formatJSToDateTime(i[key])
    : formatToDateTime(i[key], format),
}));

/**
 * Retorna um range de horários
 * @param {array} dates - Array contendo todas as datas dentro até a data máxima selecionada
 * @param {array} schedules -Array dos agendamentos existentes
 * @param {string} duration - Duração do atendimento
 * @param {startTime} startTime - Horário inicial
 * @param {endTime} endTime - Horário final
 * @param {horariosFolga} horariosFolga - Array dos horãrios de folga
 * @return {array} - Array contendo objetos com a data e agenda referente à mesma.
 */
export function getSchedule(
  dates,
  schedules,
  duration,
  startTime,
  endTime,
  horariosFolga,
) {

  /* FORMATA TODOS OS VALORES DO ARRAY PARA O FORMATO DateTime (luxon) */
  const appointments = formatArrDatesToDateTime(
    schedules,
    'data_hora',
    '',
    true,
  );

  const freeTime = formatArrDatesToDateTime(
    horariosFolga,
    'data_hora',
    '',
    true,
  );

  return dates.map((date) => {
    /* FORMATA A DATA INICIAL COM O HORÁRIO INICIAL DA AGENDA */
    const start = formatToDateTime(
      `${date.toFormat('yyyy-MM-dd')} ${startTime}`,
      'yyyy-MM-dd HH:mm',
    );

    /* RETORNA A DATA NO FORMATO YYYY-MM-DD */
    const dateFormat = date.toFormat('yyyy-MM-dd');

    /* ESTE AJUSTE FOI NECESSÁRIO POIS ESTAVA PERDENDO 2 HORAS NO FINAL DOS AGENDAMENTOS */
    //const end = DateTime.fromISO(`${dateFormat}T${endTime}00.000-05:00`);

    /* REAJUSTADO POIS O DE CIMA ESTAVA QUEBRANDO O HORARIO LIMITE*/ 
    const end =formatToDateTime(
      `${date.toFormat('yyyy-MM-dd')} ${endTime}`,
      'yyyy-MM-dd HH:mm',
    );
      
    /* RETORNA O INTERVALO DE HORÁRIOS */
    let interval = getTimeInterval(duration, start, end);

    /* FILTRA POR TODOS OS ATENDIMENTOS DO DIA ATUAL NO LOOP */
    const appointment = appointments.filter(
      (i) => i.data_hora.toFormat('yyyy-MM-dd') === date.toFormat('yyyy-MM-dd'),
    );

    /* SE POSSUIR AGENDAMENTOS */
    if (appointment.length) {
      appointment.forEach((i) => {
        /* HORARIO INICIAL MENOS DURACAO */
        const initialTime = i.data_hora.toMillis();

        /* HORARIO INICIAL MAIS DURACAO */
        const finalTime = i.data_hora.plus({ minutes: i.duracao }).toMillis();

        /* RETORNA OS HORÁRIOS BLOQUEADOS (QUE POSSUEM AGENDAMENTOS) PELO GAP */
        let blockedTimes = interval.filter(
          (horario) => horario.toMillis() >= initialTime && horario.toMillis() < finalTime,
        );

        blockedTimes = blockedTimes.map((time) => time.toMillis());
        /* REMOVE FILTRANDO OS HORÁRIOS BLOQUEADOS DO ARRAY PRINCIPAL DE HORARIOS */
        interval = [...interval.filter((time) => !blockedTimes.includes(time.toMillis()))];
      });

    }

    /* SE POSSUIR HORARIOS DE FOLGA */
    if (freeTime.length) {
      freeTime.forEach((i) => {
        /* RETORNA OS HORÁRIUOS DE FOLGA ESCOLHIDO PELO USUÁRIO */
        const freeTimesRemove = interval.filter(
          (horario) => horario.toMillis() === i.data_hora.toMillis(),

        );

        /* REMOVE FILTRANDO OS HORARIOS DE FOLGA DO ARRAY PRINCIPAL DE HORARIOS */
        interval = [
          ...interval.filter((time) => !freeTimesRemove.includes(time)),
        ];
      });
    }

    return {
      date: date.toFormat('yyyy-MM-dd'),
      schedule: interval.map((i) => i.toFormat('yyyy-MM-dd HH:mm')),
    };
  });
}

/**
 * Transforma data no formato ISO para o formato yyyyMMddHHmmss
 * @param date
 */
export const formatToGoogle = (date) => DateTime.fromISO(date)
  .setZone('America/Sao_Paulo')
  .setLocale('pt-BR')
  .toFormat('yyyyMMdd HHmmss');

/**
 * Adiciona um certa quantia de horas/minutos/segundos da data desejada
 * @param date
 */
export const addDateTime = (date, day) => DateTime.fromJSDate(date)
  .setZone('America/Sao_Paulo')
  .setLocale('pt-BR')
  .plus({ day })
  .toUTC();
