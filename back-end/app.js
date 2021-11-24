
// Import Express
const express = require('express');

// Create an Express App
const app = express();

app.use((req, res, next) => {   // A EFFACER
    res.status(201);
    next();
  });

app.use((req, res, next) => {   // A EFFACER 
    res.json({ message: 'Votre requête a bien été reçue !' }); 
 });

// Export the Express App (so that it becomes available on other files)
module.exports = app;