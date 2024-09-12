const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    if (!req.user) {
      return res.status(404).json({ error: 'No user found' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate token' });
  }
};
