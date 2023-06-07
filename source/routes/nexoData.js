import { Router } from 'express';

import nexodata from '../app/controllers/nexodata';

const route = Router();

route.post('/salvar-docs', nexodata.transferFileToS3);

export default route;
