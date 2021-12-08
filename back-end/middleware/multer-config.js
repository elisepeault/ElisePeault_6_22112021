// IMPORT
const multer = require('multer');

// MIME types dictionary 
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Creation of a configuration object for multer 
const storage = multer.diskStorage({
    destination: (req, file, callback) => {    // Explain to multer where images will be saved
        callback(null, 'images')
    },
    // Explain to multer what the file name should be. (We can't keep the original name because two files cannot be called the same)
    filename: (req, file, callback) => {  
        const name = file.originalname.split(' ').join('_');   // with the split and join methods => we transform the spaces in the original file names into : _
        const extension = MIME_TYPES[file.mimetype];   // Generate the file extension with the dictionary mime types that matches the original mime types
        callback(null, name + Date.now() + '.' + extension); // With : date.now => we make the file name unique
    }
});

// EXPORT the multer middleware fully configured
module.exports = multer({ storage }).single('image');