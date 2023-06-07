import { Router } from "express";
import controller from "../app/controllers/configuracoes";

const route = Router();

route.get("/", controller.getAmbiente);

route.get('/:id_ambiente/termos', controller.getAmbienteTermos);
route.post('/:id_ambiente/termos/criar', controller.createAmbienteTermos);

route.get('/:id_ambiente/termosteleconsulta', controller.getAmbienteTermosTeleconsulta)
route.post('/:id_ambiente/termosteleconsulta/criar', controller.createAmbienteTermoTeleconsulta);

route.get('/:id_ambiente/anamnese', controller.getAmbienteAnamnese);
route.post('/:id_ambiente/anamnese/criar', controller.bulkCreateAmbienteAnamnese);
route.delete('/:id_ambiente/anamnese/deletar', controller.deleteAmbienteAnamnese);

route.put("/:id_ambiente", controller.updateConfig);

export default route;
