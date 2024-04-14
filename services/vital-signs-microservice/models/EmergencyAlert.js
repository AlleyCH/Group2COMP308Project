const mongoose = require('mongoose');

const emergencyAlertSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    location: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmergencyAlert', emergencyAlertSchema);
