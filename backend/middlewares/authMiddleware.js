const jwt = require('jsonwebtoken');

/**
 * Authentication Middleware
 *
 * This middleware function checks the presence of a valid JWT token in the request headers.
 * If a valid token is present, it verifies the token using the provided ACCESS_TOKEN_SECRET.
 * If verification is successful, the decoded user information is attached to the request object.
 */
const authMiddleware = (req, res, next) => {
  // Get the Authorization header from the request
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // Check if the header starts with 'Bearer'
  if (!authHeader?.startsWith('Bearer')) {
    // If not, send an unauthorized response
    return res
      .status(401)
      .json({ message: 'Unauthorized. Please login to proceed' });
  } else {
    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token using the ACCESS_TOKEN_SECRET
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        // If verification fails, send a forbidden response
        return res.status(403).json({ message: 'Forbidden' });
      }
      // If verification is successful, attach the decoded user information to the request object
      req.user = decoded;
      // Pass control to the next middleware
      next();
    });
  }
};

module.exports = authMiddleware;
