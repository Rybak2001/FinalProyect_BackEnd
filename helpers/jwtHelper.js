const jwt = require('jsonwebtoken');

// Generar un token JWT
const generateToken = (userId) => {
  const payload = { id: userId };
  const options = { expiresIn: process.env.JWT_EXPIRES_IN || '1h' };
  const secret = process.env.JWT_SECRET || 'your_jwt_secret';
  return jwt.sign(payload, secret, options);
};

// Verificar un token JWT
const verifyToken = (token) => {
  try {
    console.log("Token:"+token)
    const secret = process.env.JWT_SECRET || 'your_jwt_secret';
    return jwt.verify(token, secret);
    
  } catch (error) {
    console.log("Token not valid")
    throw new Error('Token is not valid');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
