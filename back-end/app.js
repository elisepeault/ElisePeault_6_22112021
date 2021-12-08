// IMPORT
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');  //node

// IMPORT routers
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Create an Express App
const app = express();

// Use of Mongoose to connect to Mongo DB 
mongoose.connect('mongodb+srv://Elise:Noob28Bun@cluster0.dyo6b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// REQUESTS's RESPONSES

// General Middleware => CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// The json function is defined as the global middleware of this app
app.use(bodyParser.json());

// Création d'un middleware qui va répondre aux requêtes envoyées à /images et qui serve le dossier statique images grâce à express 
app.use('/images', express.static(path.join(__dirname, 'images')));

// SAVE THE ROUTES (Shows for each route => the according router (imported above))
app.use('/api/sauces', sauceRoutes); 
app.use('/api/auth', userRoutes);


// Export the Express App (so that it becomes available on other files)
module.exports = app;