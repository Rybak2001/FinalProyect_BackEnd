const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sequelize = require('./config/database'); // Base de datos Sequelize
const cors = require('cors');
const path = require('path');  // Para manejar rutas de archivos
const app = express();

// Configurar middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'my_secret_key',  // Clave secreta para las sesiones
    resave: false,
    saveUninitialized: true,
}));

// Sincronizar la base de datos
sequelize.sync();

// Habilitar CORS para permitir peticiones desde otros dominios
app.use(cors());

// Exponer la carpeta 'uploads' públicamente para que los archivos puedan ser accedidos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importar rutas desde los diferentes routers
const usersRouter = require('./routes/users');
const animalModelsRouter = require('./routes/animalModels');
const anchorPointsRouter = require('./routes/anchorPoints');
const userInteractionsRouter = require('./routes/userInteractions');
const googleLoginRouter = require('./routes/google-login'); // Importar la nueva ruta de Google login

// Usar las rutas importadas
app.use('/api/users', usersRouter); // Rutas para la gestión de usuarios
app.use('/api/animalmodels', animalModelsRouter); // Rutas para modelos de animales
app.use('/api/anchorpoints', anchorPointsRouter); // Rutas para puntos de anclaje
app.use('/api/userinteractions', userInteractionsRouter); // Rutas para interacciones de usuarios
app.use('/api/google-login', googleLoginRouter); // Nueva ruta para la autenticación de Google

// Definir el puerto en el que escuchará el servidor
const port = process.env.PORT || 3000;  // Puedes usar una variable de entorno o el puerto 3000 por defecto
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
