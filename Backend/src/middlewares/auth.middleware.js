const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const authSeller = async (req, res, next) => {




  const token = req.cookies?.token; // safer optional chaining


  
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await userModel.findById(decoded.id);
    console.log("Authenticated user:", user.email, "Role:", user.role);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized - User not found' });
    }

    if (user.role !== 'seller') {
      return res.status(403).json({ message: 'Forbidden - Seller only' });
    }

    req.seller = user; // attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

module.exports = { authSeller };
