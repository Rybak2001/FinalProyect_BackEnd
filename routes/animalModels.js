const express = require('express');
const router = express.Router();
const AnimalModel = require('../models/AnimalModel');
const multer = require('multer');
const { put } = require('@vercel/blob');

// Configure multer to handle file uploads
const upload = multer(); // We will not save the file locally, so no need for `diskStorage`

// Create an AnimalModel with file upload to Vercel Blob
router.post('/', upload.single('modelFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { model_name, thumbnail_url, description } = req.body;

        // Upload the file to Vercel Blob
        const blob = await put(req.file.originalname, req.file.buffer, {
            access: 'public',
        });

        const model_url = blob.url; // Get the URL of the uploaded file

        // Save the new animal model data in the database
        const newAnimalModel = await AnimalModel.create({
            model_name,
            model_url,
            thumbnail_url,
            description,
            created_at: new Date(),
            updated_at: new Date(),
        });

        res.status(201).json(newAnimalModel);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all AnimalModels
router.get('/', async (req, res) => {
    try {
        const animalModels = await AnimalModel.findAll();
        res.json(animalModels);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get AnimalModel by ID
router.get('/:id', async (req, res) => {
    try {
        const animalModel = await AnimalModel.findByPk(req.params.id);
        if (animalModel) {
            res.json(animalModel);
        } else {
            res.status(404).json({ error: 'AnimalModel not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update an AnimalModel
router.put('/:id', upload.single('modelFile'), async (req, res) => {
    try {
        const animalModel = await AnimalModel.findByPk(req.params.id);
        if (!animalModel) {
            return res.status(404).json({ error: 'AnimalModel not found' });
        }

        const { model_name, thumbnail_url, description } = req.body;
        let model_url = animalModel.model_url;

        if (req.file) {
            // Upload the new file to Vercel Blob if a new file is provided
            const blob = await put(req.file.originalname, req.file.buffer, {
                access: 'public',
            });
            model_url = blob.url;
        }

        await animalModel.update({
            model_name,
            model_url,
            thumbnail_url,
            description,
            updated_at: new Date(),
        });

        res.json(animalModel);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an AnimalModel
router.delete('/:id', async (req, res) => {
    try {
        const animalModel = await AnimalModel.findByPk(req.params.id);
        if (animalModel) {
            await animalModel.destroy();
            res.json({ message: 'AnimalModel deleted' });
        } else {
            res.status(404).json({ error: 'AnimalModel not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
