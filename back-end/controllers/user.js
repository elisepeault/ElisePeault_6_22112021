// IMPORT packages (encryption package & package for the creation of authentification tokens)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// IMPORT the user model (Because we will need to save and read users in this middleware)
const User = require('../models/User');

// REGISTRATION of new users
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Hash the password. 2 elements : password in the request body & salt (we run the hash algorithm 10 times).
        .then(hash => {        // We use the hash (created with bcrypt) to create a new user with an hashed password
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()  // Save the user in the database
                .then( () => res.status(201).json({ message: 'User created !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// CONNECT existing users
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email})
        .then( user => {     // check if a user is found
            if (!user) {     // If no user is found
                return res.status(401).json({ error: 'User not found !'});
            }         
            bcrypt.compare(req.body.password, user.password) // If we find a user => we compare the password (in the request) with the hash saved in the database 
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ error: 'Incorrect password !'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(   // jsonwebtoken function
                            { userId: user._id },   // Data to encode (in the token)
                            'RANDOM_TOKEN_SECRET',    // Secret key
                            { expiresIn: '24h'} 
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        }) 
        .catch(error => res.status(500).json({ error }));
};