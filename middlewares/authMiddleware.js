const jwtHelper = require('../helpers/jwtHelper');

// Middleware para autenticar el token JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Asumiendo que el formato es "Bearer TOKEN"
    try {
      const decodedToken = jwtHelper.verifyToken(token);
      req.user = decodedToken; // Guardamos los datos del usuario decodificado en req.user
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Token is not valid' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = authenticateJWT;
