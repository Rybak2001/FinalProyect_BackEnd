const AnchorPoint = require('../models/anchorPoint');
const AnimalModel = require('../models/AnimalModel');
const User = require('../models/User');
const UserInteraction = require('../models/UserInteraction');
const { sequelize } = require('../config/database');

// Datos de prueba (seeds)
const seedData = async () => {
  try {
    // Usuarios de prueba
    const user1 = await User.create({ username: 'admin', email: 'admin@example.com', password: '123456', role: 'admin' });
    const user2 = await User.create({ username: 'user1', email: 'user1@example.com', password: '123456', role: 'user' });

    // Puntos de anclaje de prueba
    const anchorPoint1 = await AnchorPoint.create({ name: 'Point A', latitude: -34.603722, longitude: -58.381592 });
    const anchorPoint2 = await AnchorPoint.create({ name: 'Point B', latitude: 40.712776, longitude: -74.005974 });

    // Modelos de animales de prueba
    const animalModel1 = await AnimalModel.create({ name: 'Lion', species: 'Panthera leo', modelURL: 'https://example.com/lion' });
    const animalModel2 = await AnimalModel.create({ name: 'Eagle', species: 'Aquila chrysaetos', modelURL: 'https://example.com/eagle' });

    // Interacciones de usuario de prueba
    await UserInteraction.create({ userId: user1.id, anchorPointId: anchorPoint1.id, interactionType: 'visited' });
    await UserInteraction.create({ userId: user2.id, anchorPointId: anchorPoint2.id, interactionType: 'liked' });

    console.log('Seed data inserted successfully.');
    process.exit(0);  // Salir del proceso exitosamente
  } catch (error) {
    console.error('Error inserting seed data:', error);
    process.exit(1);  // Salir del proceso con error
  }
};

// Ejecutar la función de seed data
seedData();
