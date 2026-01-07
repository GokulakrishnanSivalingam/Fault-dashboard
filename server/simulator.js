const axios = require('axios');

const generateData = () => {
    const statuses = ['Normal', 'Warning', 'Critical'];

    // Weighted random status
    const rand = Math.random();
    let status = 'Normal';
    if (rand > 0.8) status = 'Warning';
    if (rand > 0.95) status = 'Critical';

    // Correlate prediction with status
    let prediction = 'Safe';
    let confidence = Math.floor(Math.random() * 20) + 80; // 80-99%

    if (status === 'Warning') {
        prediction = 'Risk';
        confidence = Math.floor(Math.random() * 30) + 60; // 60-90%
    }
    if (status === 'Critical') {
        prediction = 'Fail Imminent';
        confidence = Math.floor(Math.random() * 10) + 90; // 90-100%
    }

    return {
        lineId: `LINE-${Math.floor(Math.random() * 5) + 1}`,
        status: status,
        voltage: Math.floor(Math.random() * (240 - 220 + 1) + 220),
        temperature: Math.floor(Math.random() * (90 - 40 + 1) + 40),
        prediction,
        confidence,
        imageUrl: 'https://via.placeholder.com/150'
    };
};

const sendData = async () => {
    const data = generateData();
    try {
        await axios.post('http://localhost:5000/api/detections', data);
        console.log(`Sent data: ${data.lineId} - ${data.status} | Pred: ${data.prediction}`);
    } catch (err) {
        console.error('Error sending data:', err.message);
    }
};

// Send data every 2 seconds
setInterval(sendData, 2000);
console.log('Simulator started...');
