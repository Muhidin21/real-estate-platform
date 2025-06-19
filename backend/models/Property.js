// Property.js
// Mongoose model for Property 
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['apartment', 'house', 'condo', 'land'], required: true },
  bedrooms: { type: Number, required: true },
  images: [{ type: String }],
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  listedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema); 