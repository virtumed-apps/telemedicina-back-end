/* eslint-disable camelcase */
import fetch from 'node-fetch';

async function usuarios({
  external_id,
  nome,
  sobrenome,
  data_nascimento,
  cpf,
  email,
  uf,
  sexo,
  crm,
} = {}) {
  const url = 'https://api.memed.com.br/v1/sinapse-prescricao/usuarios?api-key=%242y%2410%24N7FvEKj3ZvFlpZwgL2B%2FyOnJiYBeUSOtnA5PmG%2FHmarsGqBEGKUha&secret-key=%242y%2410%243gHoJP8OIxvxjte0uHS9gu4DL%2F9Mr2XCqrumZoT3E51mmtuCFPA2S';
  const body = {
    data: {
      type: 'usuarios',
      attributes: {
        external_id,
        nome,
        sobrenome,
        data_nascimento,
        cpf,
        email,
        uf,
        sexo,
        crm,
      },
    },

  };

  const headers = {
    Accept: 'application/vnd.api+json',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    body: JSON.stringify(body),
    headers,
    method: 'POST',
  });

  const json = await response.json();
  console.log('json', json);
  return json;
}

async function prescricoes({
  id,
}) {
  const url = `https://api.memed.com.br/v1/prescricoes/${id}?api-key=%242y%2410%24N7FvEKj3ZvFlpZwgL2B%2FyOnJiYBeUSOtnA5PmG%2FHmarsGqBEGKUha&secret-key=%242y%2410%243gHoJP8OIxvxjte0uHS9gu4DL%2F9Mr2XCqrumZoT3E51mmtuCFPA2S`;

  const headers = {
    Accept: 'application/vnd.api+json',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    headers,
    method: 'GET',
  });

  const json = await response.json();

  return json;
}

async function getUsuario({
  cpf,
} = {}) {
  const url = `https://api.memed.com.br/v1/sinapse-prescricao/usuarios/${cpf}?api-key=%242y%2410%24N7FvEKj3ZvFlpZwgL2B%2FyOnJiYBeUSOtnA5PmG%2FHmarsGqBEGKUha&secret-key=%242y%2410%243gHoJP8OIxvxjte0uHS9gu4DL%2F9Mr2XCqrumZoT3E51mmtuCFPA2S`;

  const headers = {
    Accept: 'application/vnd.api+json',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    headers,
    method: 'GET',
  });

  const json = await response.json();
  console.log('json', json);
  return json;
}

export default {
  usuarios,
  prescricoes,
  getUsuario,
};
