const bcrypt = require('bcrypt');
const User = require('../models/user'); // Importa el modelo User

// Función para generar datos aleatorios
const generateRandomUsers = (count) => {
  const firstNames = ['Pedro', 'Maria', 'Juan', 'Ana', 'Carlos', 'Lucia'];
  const lastNames = ['Garcia', 'Lopez', 'Martinez', 'Perez', 'Gonzalez'];
  const domains = ['example.com', 'email.com', 'webmail.com'];

  return Array.from({ length: count }).map((_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName1 = lastNames[Math.floor(Math.random() * lastNames.length)];
    const lastName2 = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}${i}@${domains[Math.floor(Math.random() * domains.length)]}`;

    return {
      username: `${firstName}${i}`,
      email,
      password_hash: bcrypt.hashSync('password', 10), // Contraseña encriptada
      user_role: 'user',
      active: true,
      full_name: `${firstName} ${lastName1} ${lastName2}`,
      first_lastname: lastName1,
      second_lastname: lastName2,
      id_card_number: `${10000000 + i}`, // Número de identificación único
      created_at: new Date(),
      updated_at: new Date(),
    };
  });
};

// Función para crear usuarios si faltan
const createUsersIfNotExists = async () => {
  try {
    const userCount = await User.count();

    if (userCount >= 50) {
      console.log('Ya hay 50 o más usuarios en la base de datos.');
      return;
    }

    const usersToGenerate = 50 - userCount;
    console.log(`Faltan ${usersToGenerate} usuarios. Generando...`);

    const users = generateRandomUsers(usersToGenerate);
    await User.bulkCreate(users);

    console.log(`${usersToGenerate} usuarios generados correctamente.`);
  } catch (error) {
    console.error('Error al generar usuarios:', error.message);
  }
};

module.exports = createUsersIfNotExists;
