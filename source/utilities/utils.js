import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';
import _ from 'lodash';

import { v4 } from 'uuid';
import AWS from "aws-sdk";

export const isEmpty = (value) => {
  switch (true) {
    case !value:
      return true;
    case typeof value === 'object' && Object.keys(value).length === 0:
      return true;
    case Array.isArray(value) && !value.length:
      return true;
    case null:
      return true;
    default:
      return false;
  }
};

export function calcuateDiscounts(value, percentage) {
  return Number(value) - (Number(value) * (Number(percentage) / 100));
}

export async function uploadToStorageBuffer(file) {
  if (!file) return;

  const { buffer, type } = file;

  const extension = type.split('/').pop();

  const key = `${v4()}.${extension}`


  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: 'images-telemedicina' },
  });


  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: 'images-telemedicina',
    ContentType: type,
    Key: key,
  };

  const promise = s3.upload(params).promise();

  const { Location } = await promise;

  return Location;
}

export const generateToken = (
  userId,
  expires,
  secret = process.env.JWT_SECRET || 'jwtsecret',
) => {
  const payload = {
    sub: userId,
    iat: DateTime.local().toMillis(),
    exp: DateTime.local().plus({ hours: 3 }).toMillis(),
  };
  return jwt.sign(payload, secret);
};

export const getAmbientURL = (ambient) => {
  if (process.env.NODE_ENV === 'development') return `http://${ambient}.localhost:3000`;
  return `https://${ambient}.virtumed.com.br`;
};

export const removeSpecialCharacters = (str = '') => str?.replace(/\D/g, '');

export function calculateDiscount(value, percentage) {
  return Number(value) - Number(value) * (Number(percentage) / 100);
}

export function getOnlyProfessionals(information) {
  if (!information.length) return [];

  const mapped = information
    .map((i) => ({ value: i.id_profissional, label: i.nome_profissional }));

  return Array
    .from(new Set(mapped.map((obj) => JSON.stringify(obj)))).map((item) => JSON.parse(item));
}

export function isObjectEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export function getFilteredData(filters = {}, values) {
  const isEmptyObject = isObjectEmpty(filters);
  if (isEmptyObject) return values;
  const filter = Object.values(filters).join(',');

  return values.filter((value) => JSON.stringify(value)
    .toLowerCase()
    .includes(String(filter)
      .toLowerCase()));
}

export function GetCardType(number) {
  // (Visa / Master / Amex / Elo / Aura / JCB / Diners / Discover / Hipercard / Hiper).
  let re = new RegExp('^4');

  // Visa
  if (number.match(re) != null) return 'Visa';

  // Elo
  if (/^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/
    .test(number)) return 'Elo';

  // Mastercard
  if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) return 'Master';

  // Aura
  if (/^((?!504175))^((?!5067))(^50[0-9])/.test(number)) return 'Aura';

  // Hipercard
  re = new RegExp('^606282|^3841(?:[0|4|6]{1})0');
  if (number.match(re) != null) return 'Hipercard';

  // AMEX
  re = new RegExp('^3[47]');
  if (number.match(re) != null) return 'Amex';

  // Discover
  re = new RegExp('^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)');
  if (number.match(re) != null) return 'Discover';

  // Diners
  re = new RegExp('^36');
  if (number.match(re) != null) return 'Diners';

  // Diners - Carte Blanche
  re = new RegExp('^30[0-5]');
  if (number.match(re) != null) return 'Diners';

  // JCB
  re = new RegExp('^35(2[89]|[3-8][0-9])');
  if (number.match(re) != null) return 'JCB';

  // Visa Electron
  re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
  if (number.match(re) != null) return 'Visa';

  return '';
}
