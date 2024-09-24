const express = require('express');
const router = express.Router();
const UserInteraction = require('../models/UserInteraction');

// Crear un UserInteraction
router.post('/', async (req, res) => {
    try {
        const userInteraction = await UserInteraction.create(req.body);
        res.status(201).json(userInteraction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Obtener todos los UserInteractions
router.get('/', async (req, res) => {
    try {
        const userInteractions = await UserInteraction.findAll();
        res.json(userInteractions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Obtener un UserInteraction por ID
router.get('/:id', async (req, res) => {
    try {
        const userInteraction = await UserInteraction.findByPk(req.params.id);
        if (userInteraction) {
            res.json(userInteraction);
        } else {
            res.status(404).json({ error: 'UserInteraction no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Actualizar un UserInteraction
router.put('/:id', async (req, res) => {
    try {
        const userInteraction = await UserInteraction.findByPk(req.params.id);
        if (userInteraction) {
            await userInteraction.update(req.body);
            res.json(userInteraction);
        } else {
            res.status(404).json({ error: 'UserInteraction no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Eliminar un UserInteraction
router.delete('/:id', async (req, res) => {
    try {
        const userInteraction = await UserInteraction.findByPk(req.params.id);
        if (userInteraction) {
            await userInteraction.destroy();
            res.json({ message: 'UserInteraction eliminado' });
        } else {
            res.status(404).json({ error: 'UserInteraction no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
