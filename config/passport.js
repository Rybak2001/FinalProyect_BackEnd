const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Asegúrate de que apunte al modelo correcto

// Configuración de Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',  // Asegúrate de que coincida con la ruta en tu proyecto
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Buscar si el usuario ya existe en la base de datos
    let user = await User.findOne({ where: { googleId: profile.id } });

    if (!user) {
      // Si el usuario no existe, crearlo
      user = await User.create({
        username: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Serialización de usuarios en la sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialización de usuarios desde la sesión
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
