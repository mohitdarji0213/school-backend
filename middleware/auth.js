const jwt = require('jsonwebtoken');
const User = require('../models/User');



const adminOnly = (req, res, next) => {
  jwt.verify(req.cookies.lbs_token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.id !== process.env.ADMIN_ID) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  }
);};

module.exports = { adminOnly };