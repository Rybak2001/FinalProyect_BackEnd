const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

// JWT Secret Key
const JWT_SECRET = 'your_jwt_secret_key';

// Google OAuth2 Client
const client = new OAuth2Client('926480933480-g5ihcp1bi955cn4midihi1aa74g9s0ef.apps.googleusercontent.com');

// Register a new user (local registration)
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, user_role } = req.body;

        // Ensure role is valid
        const allowedRoles = ['web', 'mobile', 'admin', 'editor'];
        if (user_role && !allowedRoles.includes(user_role)) {
            return res.status(400).json({ error: 'Invalid user role' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = await User.create({
            username,
            email,
            password_hash: hashedPassword,
            user_role: user_role || 'web',  // Default role is 'web'
        });

        res.status(201).json({ message: 'User created:'+password, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login (Generate JWT token for local users)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        // Generate JWT Token
        const token = jwt.sign({ user_id: user.user_id, user_role: user.user_role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Google Login (Generate JWT token for Google users)
router.post('/google-login', async (req, res) => {
    const { id_token } = req.body;

    try {
        // Verify the Google ID token
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: 'YOUR_GOOGLE_CLIENT_ID',
        });

        const payload = ticket.getPayload();
        const email = payload.email;

        // Check if user exists, if not, create one
        let user = await User.findOne({ where: { email } });

        if (!user) {
            // Create a new user with the Google account
            user = await User.create({
                username: payload.name,
                email: payload.email,
                password_hash: null, // Google users don't have a local password
                user_role: 'web', // Default role for Google users
            });
        }

        // Generate JWT Token
        const token = jwt.sign({ user_id: user.user_id, user_role: user.user_role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(401).json({ error: 'Invalid Google token' });
    }
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ error: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET); 
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Get all users (Protected route)
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a user by ID (Protected route)
router.get('/:id', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a user (Protected route)
router.put('/:id', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            const { username, email, password, user_role } = req.body;

            // Ensure role is valid
            const allowedRoles = ['web', 'mobile', 'admin', 'editor'];
            if (user_role && !allowedRoles.includes(user_role)) {
                return res.status(400).json({ error: 'Invalid user role' });
            }

            const updatedData = {
                username,
                email,
                user_role: user_role || user.user_role, // Keep the existing role if none is provided
            };

            if (password) {
                const salt = await bcrypt.genSalt(10);
                updatedData.password_hash = await bcrypt.hash(password, salt);
            }

            await user.update(updatedData);
            res.json({ message: 'User updated', user });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a user (Protected route)
router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
