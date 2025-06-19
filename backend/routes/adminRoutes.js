// adminRoutes.js
// Routes for admin dashboard 
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

// User management
router.get('/users', auth, role('admin'), adminController.getUsers);
router.delete('/users/:id', auth, role('admin'), adminController.deleteUser);

// Property management
router.get('/properties', auth, role('admin'), adminController.getProperties);
router.delete('/properties/:id', auth, role('admin'), adminController.deleteProperty);

module.exports = router; 