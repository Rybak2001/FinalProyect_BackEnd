const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authMiddleware');


const multer = require('multer');

// Configuración de Multer para manejar subida de perfil
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      const uniq = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniq + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage });

// Rutas para los usuarios

// Crear usuario (con imagen opcional)
router.post('/register', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);
router.put('/:id',  userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:id/toggle-active', userController.toggleUserActive);
router.post('/login', userController.login);
router.post('/recover-password', userController.recoverPassword); 
router.post('/verify-password', userController.verifyUserPassword);
router.post('/change-password',  userController.changeUserPassword);
router.post('/check-id-card', userController.checkIdCardExistence);
router.post('/check-email', userController.checkEmailExistence);
router.post('/check-username', userController.checkUsernameExistence);

router.put('/:id', upload.single('profile_picture_url'), userController.updateUser);

module.exports = router;
