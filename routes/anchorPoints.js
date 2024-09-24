const express = require('express');
const router = express.Router();
const AnchorPoint = require('../models/AnchorPoint');

// Crear un AnchorPoint
router.post('/', async (req, res) => {
    try {
        const anchorPoint = await AnchorPoint.create(req.body);
        res.status(201).json(anchorPoint);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Obtener todos los AnchorPoints
router.get('/', async (req, res) => {
    try {
        const anchorPoints = await AnchorPoint.findAll();
        res.json(anchorPoints);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Obtener un AnchorPoint por ID
router.get('/:id', async (req, res) => {
    try {
        const anchorPoint = await AnchorPoint.findByPk(req.params.id);
        if (anchorPoint) {
            res.json(anchorPoint);
        } else {
            res.status(404).json({ error: 'AnchorPoint no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Actualizar un AnchorPoint
router.put('/:id', async (req, res) => {
    try {
        const anchorPoint = await AnchorPoint.findByPk(req.params.id);
        if (anchorPoint) {
            await anchorPoint.update(req.body);
            res.json(anchorPoint);
        } else {
            res.status(404).json({ error: 'AnchorPoint no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Eliminar un AnchorPoint
router.delete('/:id', async (req, res) => {
    try {
        const anchorPoint = await AnchorPoint.findByPk(req.params.id);
        if (anchorPoint) {
            await anchorPoint.destroy();
            res.json({ message: 'AnchorPoint eliminado' });
        } else {
            res.status(404).json({ error: 'AnchorPoint no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
