const express = require('express');
const router = express.Router();
const Detection = require('../models/Detection');

// GET all detections
router.get('/', async (req, res) => {
    try {
        const detections = await Detection.find().sort({ timestamp: -1 });
        res.json(detections);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new detection (Hardware/ML integration point)
router.post('/', async (req, res) => {
    const { lineId, status, voltage, temperature, imageUrl, prediction, confidence } = req.body;

    const detection = new Detection({
        lineId,
        status,
        voltage,
        temperature,
        imageUrl,
        prediction,
        confidence
    });

    try {
        const newDetection = await detection.save();
        res.status(201).json(newDetection);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
