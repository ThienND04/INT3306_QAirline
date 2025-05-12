const jwt = require("jsonwebtoken");

function createToken(userId, userRole = "user") {
    console.log("Creating token for user:", userId);
    console.log("User role:", userRole);
    return jwt.sign(
        { 
            id: userId,
            role: userRole
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
}

module.exports = createToken;