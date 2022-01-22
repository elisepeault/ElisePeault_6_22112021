// Import Express for the creation of the router  
const express = require('express');
const router = express.Router();

// Import "userCtrl (to link the functions with the different routes)
const userCtrl = require('../controllers/user');

// IMPORT middlewares 
const rateLimit = require('../middleware/rate-limit');

// CREATION OF ROUTES
router.post('/signup', rateLimit.limiter, userCtrl.signup); // Creates an account for a new user 
router.post('/login', rateLimit.limiter, userCtrl.login);  // Connects a pre-existing user

// Export the router (So it can be imported in app.js)
module.exports = router;