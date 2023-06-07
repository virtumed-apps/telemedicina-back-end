import jwt from 'jsonwebtoken';

const auth = (request, response, next) => {
  try {
    return next();
    const token = request.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    response.status(401).json({ message: 'Token de autenticação inválido' });
  }
};

export default auth;
