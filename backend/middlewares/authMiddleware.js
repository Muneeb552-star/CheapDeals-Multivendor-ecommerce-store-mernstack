const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {

  // const accessToken = req.header('Authorization')
  // const accessToken = req.header('Authorization').replace("Bearer ", "")
  // console.log(accessToken)

  const refreshToken = req.cookies.refreshToken;
  
  if (!refreshToken) {
    return res.status(401).json({ error: 'Please login first' })
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    req.user = decoded
    next()

  } catch (error) {
    return res.status(401).json({ error: 'Please login' })
  }
}

module.exports = authMiddleware;
