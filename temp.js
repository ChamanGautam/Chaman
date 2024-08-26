const mongoose = require('mongoose');
const portfolioSchema = new mongoose.Schema({
    title: String,
    message: String
});

module.exports = mongoose.model('portfolio-data', portfolioSchema);
