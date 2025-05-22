const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Asumo que este es tu modelo de usuario
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

// JWT Secret Key
const JWT_SECRET = 'your_jwt_secret_key';

// Google OAuth2 Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


router.get('/logeo', async (req, res) => {
    try{    // Devolver el token JWT al frontend
        res.json({ message: 'Login successful', token });

    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid Google token' });
    }
});


router.post('/logeo', async (req, res) => {
  const { id_token } = req.body;
  if (!id_token) {
    return res.status(400).json({ message: 'Falta id_token en la petición' });
  }

  try {
    // 1) Verificar y decodificar token
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // 2) Mapeo de claims a campos de usuario
    const googleId      = payload.sub;
    const email         = payload.email;
    const emailVerified = payload.email_verified || false;
    const fullName      = payload.name || null;
    const givenName     = payload.given_name || null;
    const familyName    = payload.family_name || null;
    const pictureUrl    = payload.picture || null;
    const locale        = payload.locale || null;

    // 3) Buscar o crear/actualizar usuario en la BD
    let user = await User.findOne({ where: { email } });
    if (!user) {
      // Creación si no existe
      user = await User.create({
        username            : email.split('@')[0],
        email               : email,
        password_hash       : null,         // login sólo por Google
        user_role           : 'user',
        active              : true,
        full_name           : fullName,
        first_lastname      : givenName,
        second_lastname     : familyName,
        id_card_number      : null,
        profile_picture_url : pictureUrl,
        // created_at / updated_at rellena Sequelize
      });
    } else {
      // Actualizar datos básicos en cada login
      await user.update({
        full_name           : fullName,
        first_lastname      : givenName,
        second_lastname     : familyName,
      });
    }

    // 4) Preparar payload para nuestro JWT
    const jwtPayload = {
      user_id            : user.user_id,
      username           : user.username,
      email              : user.email,
      user_role          : user.user_role,
      active             : user.active,
      full_name          : user.full_name,
      first_lastname     : user.first_lastname,
      second_lastname    : user.second_lastname,
      id_card_number     : user.id_card_number,
      profile_picture_url: user.profile_picture_url,
      locale             : locale,
    };

    // 5) Firmar y enviar nuestro JWT
    const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: jwtPayload });

  } catch (err) {
    console.error('Google login error:', err);
    res.status(401).json({ message: 'Token de Google inválido' });
  }
});
module.exports=router;