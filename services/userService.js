const User = require('../models/user');
const encryptionHelper = require('../helpers/encryptionHelper');
const nodemailer = require('nodemailer'); // Necesitas instalar nodemailer
const crypto = require('crypto'); // Para generar una contraseña aleatoria

// Configura nodemailer para enviar correos
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Usa tu proveedor de correo
  auth: {
    user: process.env.EMAIL_USER, // Email del remitente
    pass: process.env.EMAIL_PASS, // Contraseña del remitente (o App Password)
  },
});

// Función para generar una contraseña aleatoria
const generateRandomPassword = () => {
  return crypto.randomBytes(8).toString('hex'); // Genera una contraseña aleatoria de 16 caracteres
};

// Enviar correo de recuperación de contraseña
const sendRecoveryEmail = async (email, newPassword) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recuperación de Contraseña',
    text: `Su nueva contraseña es: ${newPassword}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${email}`);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('No se pudo enviar el correo');
  }
};

// Recuperar contraseña: genera una nueva contraseña y la envía por correo
const recoverPassword = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const newPassword = generateRandomPassword(); // Genera una nueva contraseña
  const hashedPassword = await encryptionHelper.encryptPassword(newPassword); // Encripta la contraseña

  user.password_hash = hashedPassword; // Actualiza la contraseña en la base de datos
  await user.save();

  await sendRecoveryEmail(email, newPassword); // Envía la nueva contraseña por correo
};
// Cambiar el estado activo/inactivo de un usuario
const toggleUserActive = async (id, isActive) => {
  const user = await User.findByPk(id);
  if (user) {
    user.active = isActive;
    await user.save(); // Guarda los cambios en la base de datos
    return user;
  }
  return null;
};
// Obtener todos los usuarios
const getAllUsers = async () => {
  return await User.findAll();
};

const { v4: uuidv4 } = require('uuid'); // Importar para generar UUID si quieres también

const createUser = async (userData) => {
  try {
    // OBLIGATORIO: Generar UUID si el modelo lo necesita
    if (!userData.user_id) {
      userData.user_id = uuidv4();
    }

    // Encriptar la contraseña antes de guardar
    const hashedPassword = await encryptionHelper.encryptPassword(userData.password_hash);
    userData.password_hash = hashedPassword;

    // Crear el usuario
    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.error('Error en createUser:', error); // <-- AHORA aquí verás el error de verdad
    throw error; // Propagamos el error para que llegue al controlador
  }
};


// Obtener un usuario por ID
const getUserById = async (id) => {
  return await User.findByPk(id);
};

// Actualizar un usuario
const updateUser = async (id, userData) => {
  const user = await getUserById(id);
  if (!user) return null;

  // Si nos mandan nueva contraseña en userData.password_hash, la encriptamos
  if (userData.password_hash) {
    try {
      const hashed = await encryptionHelper.encryptPassword(userData.password_hash);
      userData.password_hash = hashed;
    } catch (err) {
      console.error('Error al hashear la contraseña en updateUser:', err);
      throw err;
    }
  }

  // Actualizamos cualquier otro campo (incluida profile_picture_url si viene)
  return await user.update(userData);
};

// Eliminar un usuario (soft delete, si se usa la propiedad active)
const deleteUser = async (id) => {
  const user = await getUserById(id);
  if (user) {
    await user.update({ active: false }); // Desactivar el usuario en lugar de eliminarlo físicamente
    return true;
  }
  return false;
};

// Buscar un usuario por email
const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

// Buscar o crear un usuario de Google
const findOrCreateGoogleUser = async (profile) => {
  let user = await User.findOne({ where: { googleId: profile.id } });
  if (!user) {
    user = await User.create({
      googleId: profile.id,
      email: profile.emails[0].value,
      fullName: profile.displayName,
      active: true, // Activar el usuario automáticamente
    });
  }
  return user;
};
// Verificar si la contraseña del usuario es correcta
const verifyPassword = async (username, enteredPassword) => {
  try {
    // Buscar al usuario por nombre de usuario
   
    const user = await getUserByUsername(username);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Comparar la contraseña ingresada con el hash almacenado
    const isPasswordCorrect = await encryptionHelper.verifyPassword(enteredPassword, user.dataValues.password_hash);
    console.log(enteredPassword+" "+user.dataValues.password_hash+" "+isPasswordCorrect)
    if (!isPasswordCorrect) {
      throw new Error('Contraseña incorrecta');
    }

    return isPasswordCorrect; // Retorna true si la contraseña es correcta
  } catch (error) {
    console.error(`Error en verifyPassword: ${error.message}`);
    throw { status: 401, message: error.message }; // Lanzar error con código 401
  }
};

// Cambiar la contraseña del usuario
const changePassword = async (username, currentPassword, newPassword) => {
  try {
    // Buscar al usuario por nombre de usuario
    const user = await getUserByUsername(username);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Verificar si la contraseña actual es correcta
    const isCurrentPasswordCorrect = await encryptionHelper.verifyPassword(currentPassword, user.getDataValue('password_hash'));

    if (!isCurrentPasswordCorrect) {
      throw new Error('La contraseña actual es incorrecta');
    }

    // Encriptar la nueva contraseña
    const hashedNewPassword = await encryptionHelper.encryptPassword(newPassword);

    // Actualizar la contraseña en la base de datos usando setDataValue
    user.setDataValue('password_hash', hashedNewPassword);
    await user.save();

    return true; // Retornar true si la actualización fue exitosa
  } catch (error) {
    console.error(`Error en changePassword: ${error.message}`);
    throw { status: 401, message: error.message }; // Lanzar error con código 401
  }
};


const checkIfIdCardExists = async (id_card_number) => {
  try {
    const user = await User.findOne({ where: { id_card_number } });
    return !!user; // Retorna true si existe, false si no
  } catch (error) {
    console.error('Error en checkIfIdCardExists:', error);
    throw new Error('Error al verificar el número de carnet de identidad');
  }
};

const checkIfEmailExists = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return !!user; // Retorna true si existe, false si no
  } catch (error) {
    console.error('Error en checkIfEmailExists:', error);
    throw new Error('Error al verificar el correo electrónico');
  }
};

const checkIfUsernameExists = async (username) => {
  try {
    const user = await User.findOne({ where: { username } });
    return !!user; // Retorna true si existe, false si no
  } catch (error) {
    console.error('Error en checkIfUsernameExists:', error);
    throw new Error('Error al verificar el nombre de usuario');
  }
};

// Buscar un usuario por nombre de usuario
const getUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};


module.exports = {
  toggleUserActive,
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  findOrCreateGoogleUser,
  recoverPassword,
  verifyPassword,
  changePassword,
  checkIfIdCardExists,
  checkIfEmailExists,
  checkIfUsernameExists,
};
