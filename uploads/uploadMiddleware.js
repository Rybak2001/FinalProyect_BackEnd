const multer = require('multer');
const path = require('path');

// Configurar el almacenamiento para los archivos subidos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// Filtros para validar los archivos (por ejemplo, solo imágenes)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes.'));
  }
};

// Configurar multer para manejar la subida de archivos
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },  // Limitar tamaño a 5MB
  fileFilter: fileFilter
});

module.exports = upload;
