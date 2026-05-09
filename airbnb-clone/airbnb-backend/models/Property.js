const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true , trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true , min: 1 },
    location: { type: String, required: true, trim: true },
    images: {type: [String], default: [] },
    amenities: { type: [String], default: [] },
    maxGuests: { type: Number, required: true, min: 1 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);