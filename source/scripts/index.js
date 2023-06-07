/* eslint-disable no-restricted-syntax */
const bcrypt = require('bcryptjs');
const { AMBIENTE } = require('./config');
const { usuarios: User } = require('../app/models');
const { removeSpecialCharacters, filterSameValues } = require('./utils');
const doctors = require('./doctors.json');

const generatePassword = (cpf) => {
  const firstThreeDigits = cpf.substring(0, 3);
  const lastThreeDigits = cpf.substr(cpf.length - 3);
  const password = `smr@${firstThreeDigits}${lastThreeDigits}`;
  const encrypted = bcrypt.hashSync(password, 10);
  return encrypted;
};

const formatUser = (doctor) => {
  try {
    const { cpf: unformattedCpf, email } = doctor;
    const cpf = removeSpecialCharacters(unformattedCpf);

    const senha = generatePassword(cpf);

    console.log('User credentials ->', email, senha);

    return {
      ...doctor,
      cpf,
      senha,
      email: email.toLowerCase(),
      id_ambiente: AMBIENTE,
      perfil_acesso: 'profissional'
    };
  } catch (error) {
    console.log(error);
  }
};

const startScript = async () => {
  const filtered = filterSameValues(doctors);
  console.log('Loading doctors...', filtered.length);
  const mapped = filtered.map((user) => formatUser(user));
  await User.bulkCreate(mapped);
  console.log('Users added...', filtered.length);
};

startScript();
