// Here is the createToken function. You can debug if there is any error.

const jwt = require('jsonwebtoken')

    module.exports = {
        createTokens:  (data) => {
            // Generate access token
            const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
        
            // Generate refresh token
            const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
        
            return { accessToken, refreshToken };
        }
    };