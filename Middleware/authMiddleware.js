const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(404).json({ message: "User not found" });
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminMiddleware = (req, res, next) => {
  if(req.user.role!=='Admin')return res.status(403).json({message:"Access denied!"});
  next();
};

module.exports = { authMiddleware, adminMiddleware };
