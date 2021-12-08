// IMPORT
const mongoose = require('mongoose');

// Create a sauce's schema (No need to put a field for the Id since it is generated automatically by Mongoose)
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: Array, required: true },      // Array  =>  ["String <userId>"] Changer ? 
    usersDisliked: { type: Array, required: true },   // Array  =>  ["String <userId>"] 
  });
  
  // Export the schema => in a model form
  module.exports = mongoose.model('Sauce', sauceSchema);
