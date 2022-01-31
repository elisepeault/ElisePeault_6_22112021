// IMPORT
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');  //node
require('dotenv').config();

console.log(process.env);

// IMPORT routers
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Create an Express App
const app = express();

// Use of Mongoose to connect to Mongo DB 
mongoose.connect( process.env.SECRET_MONGODB,  
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connection to MongoDB succeed !'))
  .catch(() => console.log('Connection to MongoDB failed !'));


// REQUESTS's RESPONSES

// General Middleware => CORS (allows a user to access resources from a server located on another origin than the current site)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// The json function is defined as the global middleware of this app
app.use(bodyParser.json());

// Creation of a middleware that will respond to requests sent to /images and that serves the static images folder using express  
app.use('/images', express.static(path.join(__dirname, 'images')));

// SAVE THE ROUTES (Shows for each route => the according router (imported above))
app.use('/api/sauces', sauceRoutes); 
app.use('/api/auth', userRoutes);


// Export the Express App (so that it becomes available on other files)
module.exports = app;