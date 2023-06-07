const middleware = (request, response, next) => {
  const { ambiente } = request.headers;

  if (ambiente) {
    request.custom = { ...request.body, ...request.query, id_ambiente: ambiente };

    return next();
  }

  return response.status(400).send({ message: 'Insira um identificador de ambiente' });
};

export default middleware;
