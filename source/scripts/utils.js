exports.removeSpecialCharacters = (string) => {
  try {
    const desired = string.replace(/[^\w\s]/gi, '');
    return desired;
  } catch (_) {
    return '';
  }
};

exports.filterSameValues = (arr = []) =>
  arr.filter((v, i, a) => a.findIndex((v2) => v2.email === v.email) === i);
