// Import Mongoose
const mongoose = require('mongoose');

// Add the validator (Avoid having multiple users with the same email adress) 
const uniqueValidator = require('mongoose-unique-validator');

// Create a user's schema (unique email)
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },  
    password: { type: String, required: true }
});

// Apply the validator to the user's schema
userSchema.plugin(uniqueValidator);

// Export the schema => in a model form
module.exports = mongoose.model('User', userSchema);