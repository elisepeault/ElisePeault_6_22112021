// IMPORT jsonwebtoken package
const jwt = require('jsonwebtoken');
// IMPORT the module that loads environment variables
require('dotenv').config();

// Middleware which will protect the selected routes and verify that the user is authenticated before authorizing the sending of his requests.
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};