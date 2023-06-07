import { Router } from "express";
import especialidades from "../app/controllers/especialidades";

const route = Router();

route.get("/profissionais", especialidades.getProfissionais);
route.get("/particular", especialidades.getEspecialidadesParticular);

export default route;
