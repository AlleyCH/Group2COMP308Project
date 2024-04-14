const mongoose = require('mongoose');

const motivationalTipSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const MotivationalTip = mongoose.model('MotivationalTip', motivationalTipSchema);

module.exports = MotivationalTip;
