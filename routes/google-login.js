const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Asumo que este es tu modelo de usuario
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

// JWT Secret Key
const JWT_SECRET = 'your_jwt_secret_key';

// Google OAuth2 Client
const client = new OAuth2Client('926480933480-0e18cniplmvhq70kcf0ja97tr70ai5kc.apps.googleusercontent.com');

// Google Login (Verificar el token ID, registrar al usuario si no existe, y loguearlo)
router.post('/logeo', async (req, res) => {
    const { id_token } = req.body;  // El frontend debe enviar el ID token en el body

    try {
        // Verificar el ID Token con Google
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: '926480933480-0e18cniplmvhq70kcf0ja97tr70ai5kc.apps.googleusercontent.com',  // Tu client ID de Google
        });

        const payload = ticket.getPayload();
        const email = payload.email;
        const name = payload.name;

        // Verificar si el usuario ya existe
        let user = await User.findOne({ where: { email } });

        if (!user) {
            // Si el usuario no existe, lo registramos
            user = await User.create({
                username: name,
                email: email,
                password_hash: null,  // No hay contraseña porque es un usuario de Google
                user_role: 'mobile',  // Rol por defecto para usuarios de Google
            });
        }

        // Generar el JWT Token para el usuario autenticado
        const token = jwt.sign({ user_id: user.user_id, user_role: user.user_role }, JWT_SECRET, { expiresIn: '1h' });

        // Devolver el token JWT al frontend
        res.json({ message: 'Login successful', token });

    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid Google token' });
    }
});

module.exports = router;
