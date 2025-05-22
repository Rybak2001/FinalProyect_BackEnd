const AnimalModelService = require('../services/animalModelService');
const multer = require('multer');
const path = require('path');

// Configuración de Multer para almacenar archivos en la carpeta '/uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Nombre único del archivo
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: Infinity } // O especificar un límite mayor si es necesario
});

// Obtener todos los modelos de animales
const getAllAnimalModels = async (req, res, next) => {

  try {
    const animalModels = await AnimalModelService.getAllAnimalModels();
    res.status(200).json(animalModels);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo modelo de animal con subida de archivo
const createAnimalModel = async (req, res, next) => {
  try {
    console.log(req.files)
    if (!req.files || !req.files.model_url || !req.files.icon_url) {
      return res.status(400).json({ message: 'Se requieren los archivos model_url e icon_url' });
    }

    // Preparar datos para enviar al servicio
    const animalModelData = {
      ...req.body,
      modelURL: `/uploads/${req.files.model_url[0].filename}`,
      icon: `/uploads/${req.files.icon_url[0].filename}`,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const newAnimalModel = await AnimalModelService.createAnimalModel(animalModelData);
    res.status(201).json(newAnimalModel);
  } catch (error) {
    next(error);
  }
};

// Obtener un modelo de animal por ID
const getAnimalModelById = async (req, res, next) => {
  try {
    console.log("HOLAAAAAAAAAAAAAAA")
    const animalModel = await AnimalModelService.getAnimalModelById(req.params.id);
    
    if (!animalModel) {
      return res.status(404).json({ message: 'Animal Model not found' });
    }

    console.log(animalModel)
    res.status(200).json(animalModel);
  } catch (error) {
    next(error);
  }
};

// Actualizar un modelo de animal
const updateAnimalModel = async (req, res, next) => {
  try {
    const modelId = req.params.id;

    // Obtener el modelo actual (para mantener las URLs existentes si no se suben archivos nuevos)
    const existingModel = await AnimalModelService.getAnimalModelById(modelId);
    if (!existingModel) {
      return res.status(404).json({ message: 'Animal Model not found' });
    }

   
    // Preparar el objeto actualizado
    const updatedData = {
      ...req.body,
      modelURL: existingModel.modelURL, // por defecto el valor existente
      iconURL: existingModel.icon,   // por defecto el valor existente
      updated_at: new Date()
    };
 
    // Si se sube un nuevo archivo de modelo, actualizar la ruta
    if (req.files?.model_url?.[0]) {
      updatedData.modelURL = `/uploads/${req.files.model_url[0].filename}`;
    }

    // Si se sube un nuevo archivo de icono, actualizar la ruta
    if (req.files?.icon_url?.[0]) {
      updatedData.iconURL = `/uploads/${req.files.icon_url[0].filename}`;
    }
    console.log(updatedData)
    const updatedAnimalModel = await AnimalModelService.updateAnimalModel(modelId, updatedData);
   
    console.log(updatedAnimalModel)
    
    res.status(200).json(updatedAnimalModel);

  } catch (error) {
    next(error);
  }
};


// Eliminar un modelo de animal
const deleteAnimalModel = async (req, res, next) => {
  try {
    const result = await AnimalModelService.deleteAnimalModel(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Animal Model not found' });
    }
    res.status(200).json({ message: 'Animal Model deleted successfully' });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllAnimalModels,
  createAnimalModel: [
    upload.fields([{ name: 'model_url', maxCount: 1 }, { name: 'icon_url', maxCount: 1 }]),
    createAnimalModel,
  ],
  getAnimalModelById,
  updateAnimalModel: [
    upload.fields([{ name: 'model_url', maxCount: 1 }, { name: 'icon_url', maxCount: 1 }]),
    updateAnimalModel,
  ],
  deleteAnimalModel,

};
