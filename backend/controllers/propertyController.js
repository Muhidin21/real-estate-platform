// propertyController.js
// Controller for property listing logic 

const Property = require('../models/Property');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Add Property
const addProperty = async (req, res) => {
  try {
    const { title, description, price, location, type, bedrooms, coordinates } = req.body;
    const images = req.files ? req.files.map(f => f.path) : [];
    const property = await Property.create({
      title, description, price, location, type, bedrooms, coordinates, images, listedBy: req.user.id
    });
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit Property
const editProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.listedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    Object.assign(property, req.body);
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.listedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await property.deleteOne();
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View Property
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('listedBy', 'name email');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List/Search/Filter Properties
const listProperties = async (req, res) => {
  try {
    const { priceMin, priceMax, location, type, bedrooms, q } = req.query;
    let filter = {};
    if (priceMin || priceMax) filter.price = {};
    if (priceMin) filter.price.$gte = Number(priceMin);
    if (priceMax) filter.price.$lte = Number(priceMax);
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (type) filter.type = type;
    if (bedrooms) filter.bedrooms = Number(bedrooms);
    if (q) filter.title = { $regex: q, $options: 'i' };
    const properties = await Property.find(filter).populate('listedBy', 'name email');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Save Favorite
const saveFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.favorites.includes(req.params.id)) {
      user.favorites.push(req.params.id);
      await user.save();
    }
    res.json({ message: 'Property added to favorites' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove Favorite
const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter(fav => fav.toString() !== req.params.id);
    await user.save();
    res.json({ message: 'Property removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Contact Agent
const contactAgent = async (req, res) => {
  try {
    const { propertyId, name, email, message } = req.body;
    const property = await Property.findById(propertyId).populate('listedBy');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    const agentEmail = property.listedBy.email;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: agentEmail,
      subject: `New inquiry for ${property.title}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });
    res.json({ message: 'Message sent to agent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addProperty,
  editProperty,
  deleteProperty,
  getProperty,
  listProperties,
  saveFavorite,
  removeFavorite,
  contactAgent
}; 