const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'pawfinds-dev-secret-change-in-production';

function authRequired(req, res, next) {
  const h = req.headers.authorization;
  if (!h || !h.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Please login to continue.' });
  }
  try {
    const payload = jwt.verify(h.slice(7), JWT_SECRET);
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired session.' });
  }
}

function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required.' });
  }
  return next();
}

module.exports = { authRequired, adminOnly, JWT_SECRET };
