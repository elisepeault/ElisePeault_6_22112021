// IMPORT Express for the creation of the router  
const express = require('express');
const router = express.Router();

// IMPORT sauceCtrl (to link the functions with the different routes)
const sauceCtrl = require('../controllers/sauce');

// IMPORT middlewares 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// CREATION OF ROUTES
router.post('/', auth, multer, sauceCtrl.createSauce); // Create a sauce object
//router.post('/api/sauces/:id/like', auth, sauceCtrl.updateLikes); // Define the "like/dislike" status for a specific userId
//router.put('/:id', auth, multer, sauceCtrl.modifySauce);  // Modify an existing sauce object
//router.delete('/:id', auth, sauceCtrl.deleteSauce);  // Delete a sauce object
router.get('/:id', auth, sauceCtrl.getOneSauce); // Get the details of one sauce (based on its id)
router.get('/', auth, sauceCtrl.getAllSauces); // Display all the sauces objects 

// Export the router (So it can be imported in app.js)
module.exports = router;