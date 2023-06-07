import { Router } from 'express';

const route = Router();

route.get('/', (request, response) => {
  response.json('healthy');
});

export default route;
