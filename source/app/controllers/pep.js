import _ from 'lodash';
import { dateFromJSFormat } from '../../utilities/date';
import { sendError, sendSuccess } from '../../utilities/response';
import { getFilteredData, getOnlyProfessionals } from '../../utilities/utils';
import PepService from '../services/pep';

const getTreeInformation = async (request, response) => {
  try {
    const { idUsuario, filter } = request.body;

    const information = await PepService.getPepInformationFiltered(idUsuario);

    if (!information.length) {
      return sendSuccess({
        response,
        status: 201,
        message: 'Nenhum item foi retornado',
      });
    }

    /* RETORNA UM ARRAY COM TODOS OS PROFISSIONAIS VINCULADOS AS EVOLUÇÕES */
    const professionals = getOnlyProfessionals(information);

    /* RETORNA AS INFORMAÇÕES FILTRADAS DE ACORDO COM O OBJECT RECEBIDO */
    const filtered = getFilteredData(filter, information);

    /* RETORNA AS INFORMAÇÕES AGRUPADAS POR DATA EM UM OBJETO */
    const groupedByDate = _.groupBy(filtered, (value) => dateFromJSFormat(value.data_hora_criacao, 'yyyy-MM-dd'));

    sendSuccess({
      status: 200,
      response,
      message: 'Árvore retornada',
      data: { tree: groupedByDate, professionals },
    });
  } catch (error) {
    console.log(error);
    sendError({
      response,
      status: 400,
      message: 'Ocorreu um erro ao retornar a árvore!',
    });
  }
};

export default {
  getTreeInformation,
};
