import { EMAIL_REGEX } from '../regex';

function validateEmailArray(arr = []) {
  const invalidEmails = [];

  arr.forEach((email) => {
    if (!EMAIL_REGEX.test(email)) invalidEmails.push(email);
  });

  return invalidEmails;
}

export default {
  validateEmailArray,
};
