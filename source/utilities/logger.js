import winston, { format } from 'winston';
import { formatFromISO } from './date';

const defaultFormat = format.printf(({ message, timestamp }) => {
  const date = formatFromISO(timestamp);

  return `[${date}] ${message}`;
});

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: 'debug.log',
      level: 'debug',
      format: winston.format.combine(
        format.timestamp(),
        defaultFormat,
      ),
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: winston.format.combine(
        format.timestamp(),
        defaultFormat,
      ),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      format.timestamp(),
      defaultFormat,
    ),
  }));
}

export default logger;
