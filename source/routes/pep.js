import { Router } from 'express';
import PepController from '../app/controllers/pep';
import PepService from '../app/services/pep'

const route = Router();

route.post('/', PepController.getTreeInformation);

route.post('/errata/save', PepService.saveErrataContent);

route.get('/errata/values/:id', PepService.getErrataContent);

export default route;
