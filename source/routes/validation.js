import { Router } from 'express';

const route = Router();

route.get('/', (request, response) => {
  response.status(200).json('A sessão é válida!');
});

export default route;
