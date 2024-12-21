// middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secretKeyJWT';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; 
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid auth format' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // On peut stocker decoded dans req.user
    req.user = decoded; // => { id, username, role, iat, exp }
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
