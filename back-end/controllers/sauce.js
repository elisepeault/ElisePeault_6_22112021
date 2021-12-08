// IMPORT the Sauce model (created with Mongoose) 
const Sauce = require('../models/Sauce');

// IMPORT the package file system (node) Allows to modify file systems, delete files...
const fs = require('fs');

// Export the function that creates a sauce object
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete req.body._id; // le frontend vu comme il est construit renvoi un id => on n'en a pas besoin donc on supprime ce champ avant de copier l'objet
    const sauce = new Sauce ({
        ...sauceObject,  // raccourci qui va copier les champs qui sont dans le body de la request (title, description...)
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // Pour enregistrer cet objet thing dans la base de donnée. Save enregistre l'objet dans la base de donnée et retourne un promise
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'})) // il faut renvoyer une réponse au frontend sinon on aura l'expiration de la requête
        .catch(error => res.status(400).json({ error }));   // error is a shortcut for : " error: error "
};

// Export the function that displays all sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()  //méthode find() permet de renvoyer tous les objets (un tableau contenant tous les Things dans notre base de données)
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};
