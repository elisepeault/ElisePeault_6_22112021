// IMPORT the Sauce model (created with Mongoose) 
const Sauce = require('../models/Sauce');

// IMPORT the package file system (node) Allows to modify file systems, delete files...
//const fs = require('fs');


// Export the function that creates a sauce object
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete req.body._id; // The frontend generate an id => delete the field because we don't need it
    const sauce = new Sauce ({
        ...sauceObject,  // Shortcut that copies the fields that are in the body of the request (name, description...)
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [' '],
        usersdisLiked: [' '],
    });
    // Save the sauce object in the database & return a promise
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'})) // Return a response to the frontend => it prevents the request from expiring
        .catch(error => res.status(400).json({ error }));   // error is a shortcut for : " error: error "
};


// Export the function that displays all sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()  
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};


// Get details for one sauce object with its id
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  }