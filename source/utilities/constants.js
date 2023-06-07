export const responseMessages = (type = 'dado') => ({
  EMPTY_MESSAGE: `Não existe nenhum ${type} com esse identificador`,
  DELETE_MESSAGE: `${type} foi deletado com sucesso!`,
  SUCCESS_GET_MESSAGE: `${type} foi retornado com sucesso!`,
  SUCCESS_PATCH_MESSAGE: `${type} foi atualizado com sucesso!`,
  SUCCESS_GETALL_MESSAGE: `${type} foram retornados com sucesso!`,
  EMPTY_GETALL_MESSAGE: `Nenhum ${type} foi retornado!`,
  SUCCESS_CREATE_MESSAGE: `${type} foi criado com sucesso!`,
});
export const EMPTY_STATUS = 204;
export const DEFAULT_SUCCESS_STATUS = 200;
export const DEFAULT_ERROR_STATUS = 400;
export const EMPTY_RESPONSE_MESSAGE = 'Nenhum dado foi retornado!';
export const DEFAULT_ERROR_MESSAGE = 'Oops! ocorreu um problema';
export const DEFAULT_SUCCESS_MESSAGE = 'Ação efetuada com sucesso!';
