// IMPORT the Sauce model (created with Mongoose) 
const Sauce = require('../models/Sauce');

// IMPORT the package file system (node) Allows to modify file systems, delete files...
const fs = require('fs');


// Exports the function that displays all sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()  
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};


// Exports the function that gets details for one sauce object with its id
exports.getOneSauce = (req, res, next) => {
    Sauce.findById(req.params.id)
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  }


// Exports the function that creates a sauce object
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
        .then(() => res.status(201).json({ message: 'Sauce registered !'})) // Return a response to the frontend => it prevents the request from expiring
        .catch(error => res.status(400).json({ error }));   // error is a shortcut for : " error: error "
};


// Exports the function that modifies a sauce object
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // 1st argument : modified object (_id) // 2nd argument : new object
      .then(() => res.status(200).json({ message: 'Sauce modified !'}))
      .catch(error => res.status(400).json({ error }));
};


// Exports the function that deletes a sauce object
exports.deleteSauce = (req, res, next) => {
    Sauce.findById(req.params.id)
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id }) 
            .then(() => res.status(200).json({ message: 'Sauce deleted !'}))
            .catch(error => res.status(400).json({ error })); 
        });
    })
    .catch (error => res.status(500).json({ error }));
};

// Exports the function that adds or deletes a like/dislike for a sauce
exports.updateLikesDislikes = (req, res, next) => {
    let like = req.body.like;
    let userId = req.body.userId;
    let sauceId = req.params.id;
    console.log(req.body);

    switch (like) {
        case 1 :  // To add a like 
            Sauce.updateOne(
                { _id: sauceId },  // Defines the id of the sauce we want to like
                { $push: { usersLiked: userId }, // push the userId in the usersLiked array  ($push => mongoDB operator)
                $inc: { likes: +1 }  })  // increment the likes number
              .then(() => res.status(200).json({ message: `Like added` }))
              .catch((error) => res.status(400).json({ error }))      
          break;
    
        case 0 :  // to delete a like / dislike
            Sauce.findById(sauceId)
               .then((sauce) => {
                // to delete a like
                if (sauce.usersLiked.includes(userId)) {    // Determine if the array "usersLiked" (of a specific sauce) contains the value "userId"
                  Sauce.updateOne(
                      { _id: sauceId }, // Defines the id of the sauce for which we want to remove the like
                      { $pull: { usersLiked: userId }, // remove the userId in the usersLiked array
                      $inc: { likes: -1 }  }) // decrement the likes number
                    .then(() => res.status(200).json({ message: `Like removed` }))
                    .catch((error) => res.status(400).json({ error }))
                }
                // to delete a dislike
                if (sauce.usersDisliked.includes(userId)) {    // Determine if the array "usersDisliked" (of a specific sauce) contains the value "userId"
                  Sauce.updateOne(
                      { _id: sauceId }, // Defines the id of the sauce for which we want to remove the dislike
                      { $pull: { usersDisliked: userId }, // remove the userId in the usersDisliked array
                      $inc: { dislikes: -1 }  })  // decrement the dislikes number
                    .then(() => res.status(200).json({ message: `Dislike removed` }))
                    .catch((error) => res.status(400).json({ error }))
                }
              })
              .catch((error) => res.status(404).json({ error }))
          break;
    
        case -1 :  // To add a dislike
            Sauce.updateOne(
                { _id: sauceId }, // Defines the id of the sauce we want to dislike
                { $push: { usersDisliked: userId }, // push the userId in the usersDisliked array
                $inc: { dislikes: +1 }  })  // increment the dislikes number
              .then(() => { res.status(200).json({ message: `Dislike added` }) })
              .catch((error) => res.status(400).json({ error }))
          break;
          
          default:
            console.log(error);
      }
};
