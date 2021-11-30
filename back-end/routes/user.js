// Import Express for the creation of the router  
const express = require('express');
const router = express.Router();

// Import "userCtrl (to link the functions with the different routes)
const userCtrl = require('../controllers/user');

// CREATION OF ROUTES
router.post('/signup', userCtrl.signup);  
router.post('/login', userCtrl.login);

// Export the router (So it can be imported in app.js)
module.exports = router;