const jwt = require('jsonwebtoken')

/**
 * Authentication Middleware
 *
 * This middleware function checks the presence of a valid JWT token in the request headers.
 * If a valid token is present, it verifies the token using the provided ACCESS_TOKEN_SECRET.
 * If verification is successful, the decoded user information is attached to the request object.
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader?.startsWith('Bearer')) {
      return res
        .status(401)
        .json({ message: 'Unauthorized. Please login to proceed' })
  } else {
      const token = authHeader.split(' ')[1]

    // Verify the token using the ACCESS_TOKEN_SECRET
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' })
      }
      req.user = decoded
      next()
    })
  }
}

module.exports = authMiddleware
