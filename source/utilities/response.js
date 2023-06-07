import {
  DEFAULT_ERROR_STATUS,
  DEFAULT_ERROR_MESSAGE,
} from './constants';

export const sendError = ({
  response, message, status, error,
}) => response
  .status(status || DEFAULT_ERROR_STATUS)
  .json({
    status: 'error',
    message: message || DEFAULT_ERROR_MESSAGE,
    error,
    messageError: message
  });

export const sendSuccess = ({
  response, message, status, data,
}) => response
  .status(status)
  .json({
    status: 'success',
    message,
    ...(Array.isArray(data) ? { list: data } : data),
  });
