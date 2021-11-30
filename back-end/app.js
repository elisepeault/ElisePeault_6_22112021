// IMPORT
const express = require('express');
const mongoose = require('mongoose');

// IMPORT routers
//const saucesRoutes = require('./routes/sauces');
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

// SAVE THE ROUTES (Shows for each route => the according router (imported above))
//app.use('/api/sauces', saucesRoutes); 
app.use('/api/auth', userRoutes);

app.use((req, res, next) => {   // TEST POSTMAN 
    res.status(201);
    next();
  });

app.use((req, res, next) => {   // TEST POSTMAN
    res.json({ message: 'Votre requête a bien été reçue !' }); 
    next();
 });
 
 // // GET => Returns an array of all the sauces in the database
// app.get('/api/sauces', (req, res, next) => {
//   const sauces = [
//     {
//       _id: 'oeihfzeoi', // nécessaire ici ?
//       name: 'Sauce n°1',
//       manufacturer: 'Fabriquant 1',
//       description: 'Les infos de mon premier objet 1',
//       mainPepper: 'Principal ingrédient 1',
//       imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//       heat: 'Force de la sauce 1',
//       likes: "Nombre d'utilisateurs qui aiment 1",
//       dislikes: "Nombre d'utilisateurs qui n'aiment pas 1",
//       //usersLiked: [ "String <userId>" ],
//       //usersDisliked: [ "String <userId>" ],
//       userId: 'qsomihvqios',
//     },
//     {
//       _id: 'oeihfzeomoihi', // nécessaire ici ?
//       name: 'Sauce n°2',
//       manufacturer: 'Fabriquant 2',
//       description: 'Les infos de mon premier objet 2',
//       mainPepper: 'Principal ingrédient 2',
//       imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//       heat: 'Force de la sauce 2',
//       likes: "Nombre d'utilisateurs qui aiment 2",
//       dislikes: "Nombre d'utilisateurs qui n'aiment pas 2",
//       //usersLiked: [ "String <userId>" ],
//       //usersDisliked: [ "String <userId>" ],
//       userId: 'qsomihvqios',
//     },
//   ];
//   res.status(200).json(sauces);
//   next()
// });


// Export the Express App (so that it becomes available on other files)
module.exports = app;