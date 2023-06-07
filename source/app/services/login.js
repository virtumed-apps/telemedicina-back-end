import { usuarios } from '../models';

async function login({ email, id_ambiente }) {
  return usuarios.findOne({
    where: { email, id_ambiente },
  });
}

export default {
  login,
};
