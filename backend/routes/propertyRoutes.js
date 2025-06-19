// propertyRoutes.js
// Routes for property listings 
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const auth = require('../middleware/authMiddleware');
const upload = require('../utils/uploadFile');

// CRUD
router.post('/', auth, upload.array('images'), propertyController.addProperty);
router.put('/:id', auth, propertyController.editProperty);
router.delete('/:id', auth, propertyController.deleteProperty);
router.get('/:id', propertyController.getProperty);
router.get('/', propertyController.listProperties);

// Favorites
router.post('/:id/favorite', auth, propertyController.saveFavorite);
router.delete('/:id/favorite', auth, propertyController.removeFavorite);

// Contact Agent
router.post('/contact', propertyController.contactAgent);

module.exports = router; 