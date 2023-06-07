import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import configuration from './configuration';
import configureRouter from './routes';
import logger from './utilities/logger';
import formatter from './app/middlewares/formatter';

dotenv.config();

(function startServer() {
  const server = express();

  server.use(cors());

  server.use(bodyParser.urlencoded({ extended: false }));

  server.use(bodyParser.json());

  server.use('*', formatter);

  configureRouter(server);

  server.listen(configuration.serverPort, (error) => {
    if (error) {
      logger.error(error);
    }

    logger.info(
      `Servidor inicializado com sucesso na porta ${configuration.serverPort}!`,
    );
  });
}());
