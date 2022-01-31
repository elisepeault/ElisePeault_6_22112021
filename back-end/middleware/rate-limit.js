// IMPORT rate limit package (      )
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 10, // Start blocking after 10 requests
});

module.exports = { limiter };