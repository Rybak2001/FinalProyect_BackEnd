const bcrypt = require('bcrypt');

// Encriptar una contraseña
const encryptPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Verificar una contraseña
const verifyPassword = async (inputPassword, storedHashedPassword) => {
 
  return await bcrypt.compare(inputPassword, storedHashedPassword);
};

module.exports = {
  encryptPassword,
  verifyPassword,
};
