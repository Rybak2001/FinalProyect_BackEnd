const express = require('express');
const morgan = require('morgan');  // Logging de peticiones HTTP
const helmet = require('helmet');  // Mejorar seguridad
const cors = require('cors');      // Habilitar CORS
const bodyParser = require('body-parser');  // Parsear las solicitudes JSON
const { connectDB } = require('./database.js'); // Conexión a PostgreSQL
const passport = require('passport');
const googleLoginRoutes = require('../routes/google-login');
const analyticsRoutes = require('../routes/analyticsRoutes');
const app = express();
app.use(morgan('dev'));
app.use(helmet({crossOriginResourcePolicy: false,}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');
const anchorPointRoutes = require('../routes/anchorPoints');
const animalModelRoutes = require('../routes/animalModels');
const userRoutes = require('../routes/users');
const userInteractionRoutes = require('../routes/userInteractions');
app.use('/api/anchorpoints', anchorPointRoutes);
app.use('/api/animalmodels', animalModelRoutes);
app.use('/api/users', userRoutes);
app.use('/api/userinteractions', userInteractionRoutes);
app.use('/api/analytics', analyticsRoutes);
// Ruta para la autenticación de Google
app.use('/api/google-login', googleLoginRoutes);
// Manejo global de errores
// Configurar la carpeta 'uploads' como pública
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const createUsersIfNotExists = require('../data/generateUsers.js'); // Importa la función

// Ruta de verificación de conexión desde dispositivos móviles
app.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const startServer = async () => {
    try {
      await connectDB();
      await createUsersIfNotExists();
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

startServer();

module.exports = app;
