const mongoose = require('mongoose');

const DetectionSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    lineId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Normal', 'Warning', 'Critical'],
        default: 'Normal',
    },
    voltage: {
        type: Number,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    prediction: {
        type: String,
        enum: ['Safe', 'Risk', 'Fail Imminent'],
        default: 'Safe',
    },
    confidence: {
        type: Number,
        default: 0,
    },
    imageUrl: {
        type: String, // URL if ML model saves images
        required: false,
    }
});

module.exports = mongoose.model('Detection', DetectionSchema);
