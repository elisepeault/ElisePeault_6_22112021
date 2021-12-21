// IMPORT rate limit package (      )
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 5, // Start blocking after 3 requests
    message: "Too many failed connection attempts. Please try again in 15 minutes",
});

module.exports = { limiter };