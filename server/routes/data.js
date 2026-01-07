const express = require('express');
const router = express.Router();

// GET simple data for ESP32
router.get('/', (req, res) => {
    res.json({
        message: "Hello from Backend!",
        timestamp: new Date().toISOString(),
        value: Math.floor(Math.random() * 100),
        status: "active"
    });
});

module.exports = router;
