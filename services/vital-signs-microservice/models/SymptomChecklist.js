const mongoose = require('mongoose');

const symptomChecklistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    symptoms: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SymptomChecklist', symptomChecklistSchema);
