const UserService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento para perfil
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Carpeta donde se guardan las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


// Obtener todos los usuarios
const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();

    res.status(200).json(users);

  } catch (error) {
    next(error);
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    // Adjuntar la URL de imagen si fue subida
    const profile_picture_url = req.file ? `/uploads/${req.file.filename}` : null;

    const userData = {
      ...req.body,
      profile_picture_url,
    };

    const newUser = await UserService.createUser(userData);

    // Crear objeto userInfo igual que en login
    const userInfo = {
      user_id: newUser.user_id,
      username: newUser.username,
      email: newUser.email,
      user_role: newUser.user_role,
      active: newUser.active,
      full_name: newUser.full_name,
      first_lastname: newUser.first_lastname,
      second_lastname: newUser.second_lastname,
      id_card_number: newUser.id_card_number,
      created_at: newUser.created_at,
      updated_at: newUser.updated_at,
      profile_picture_url: newUser.profile_picture_url || null,
    };

    // Generar token
    const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log(userInfo)
    // Devolver respuesta igual que login
    res.status(201).json({
      token,
      user: userInfo,
      message: 'User registered successfully',
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Obtener un usuario por ID
const getUserById = async (req, res, next) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const profile_picture_url = req.file ? `/uploads/${req.file.filename}` : undefined;

    const userData = {
      ...req.body,
      ...(profile_picture_url && { profile_picture_url }), // solo si hay imagen nueva
    };

    console.log("sdfsdafdsafdsafsadHOLAAAAAAAAAAAAA")
    console.log(req.body)

    const updatedUser = await UserService.updateUser(req.params.id, userData);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Eliminar un usuario
const deleteUser = async (req, res, next) => {
  try {
    const result = await UserService.deleteUser(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Verificación básica de entrada
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    console.log(req.body);

    // Verificar si es el usuario admin con contraseña admin
    if (email === 'admin' && password === 'admin') {
      const adminUser = {
        user_id: 'admin',
        username: 'Admin',
        email: 'admin',
        user_role: 'admin',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        profile_picture_url: null, // Puede dejarse como null si no tiene imagen
      };

      const token = jwt.sign(adminUser, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res.status(200).json({
        token,
        user: adminUser,
        message: 'Admin logged in successfully',
      });
    }

    // Buscar usuario por email
    const user = await UserService.getUserByEmail(email);

    // Si el usuario no existe
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verificar si la contraseña coincide
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Crear un objeto con la información del usuario
    const userInfo = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      user_role: user.user_role,
      active: user.active,
      full_name: user.full_name,
      first_lastname: user.first_lastname,
      second_lastname: user.second_lastname,
      id_card_number: user.id_card_number,
      created_at: user.created_at,
      updated_at: user.updated_at,
      profile_picture_url: user.profile_picture_url || null, // Incluye la URL de la imagen si está disponible
    };

    // Generar token JWT
    const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Responder con el token y la información del usuario
    res.status(200).json({
      token,
      user: userInfo,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const toggleUserActive = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active } = req.body; // Se espera un valor booleano en el cuerpo de la solicitud
    const updatedUser = await UserService.toggleUserActive(id, active);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
  };

  // Recuperar contraseña
const recoverPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    await UserService.recoverPassword(email);
    res.status(200).json({ message: 'Password recovery email sent successfully' });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: 'User not found' });
    }
    next(error);
  }
};
// Verificar si la contraseña del usuario es correcta
const verifyUserPassword = async (req, res, next) => {
  const { email, password } = req.body;
  // Verificación básica de entrada
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  
  try {
    
    // Verificar la contraseña usando el servicio
    const isPasswordCorrect = await UserService.verifyPassword(email, password);

    
    // Si la contraseña no coincide
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Responder con éxito si la contraseña es correcta
    res.status(200).json({ message: 'Password is correct' });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: 'User not found' });
    }
    next(error);
  }
};
// Cambiar la contraseña del usuario
const changeUserPassword = async (req, res, next) => {
  console.log(req.body)
  const { email, currentPassword, newPassword } = req.body;
  
  // Verificación básica de entrada
  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Email, current password, and new password are required' });
  }

  try {
    // Verificar si la contraseña actual es correcta
    const isCurrentPasswordCorrect = await UserService.verifyPassword(email, currentPassword);

    if (!isCurrentPasswordCorrect) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Cambiar la contraseña en el servicio
    await UserService.changePassword(email, currentPassword, newPassword);

    // Responder con éxito si la contraseña se cambió correctamente
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: 'User not found' });
    }
    next(error);
  }
};
const checkIdCardExistence = async (req, res, next) => {
  try {
    const { id_card_number } = req.body;
    const exists = await UserService.checkIfIdCardExists(id_card_number);
    res.status(200).json({ exists });
  } catch (error) {
    next(error);
  }
};

const checkEmailExistence = async (req, res, next) => {
  try {
    const { email } = req.body;
    const exists = await UserService.checkIfEmailExists(email);
    res.status(200).json({ exists });
  } catch (error) {
    next(error);
  }
};

const checkUsernameExistence = async (req, res, next) => {
  try {
    const { username } = req.body;
    const exists = await UserService.checkIfUsernameExists(username);
    res.status(200).json({ exists });
  } catch (error) {
    next(error);
  }
};

// Junto al resto de exports al final del archivo…
const updateProfilePicture = async (req, res) => {
  try {
    // Si multer procesó un fichero:
    if (!req.file) {
      return res.status(400).json({ message: 'No se recibió ninguna imagen' });
    }

    // Construir la ruta relativa que grabaste en uploads/
    const profile_picture_url = `/uploads/${req.file.filename}`;

    // Llamas al service para actualizar solo este campo:
    const updatedUser = await UserService.updateUser(req.params.id, {
      profile_picture_url
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Devolver la entidad actualizada (o solo la URL si prefieres)
    return res.status(200).json({ profile_picture_url });
  } catch (err) {
    console.error('Error updating profile picture:', err);
    return res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  login,
  toggleUserActive,
  recoverPassword,
  verifyUserPassword,
  changeUserPassword,
  checkIdCardExistence,
  checkEmailExistence,
  updateProfilePicture,
  checkUsernameExistence,
  createUser: [
    upload.single('profile_picture_url'), 
    createUser,
  ],
  updateUser: [
    upload.single('profile_picture_url'),
    updateUser,
  ],
};
