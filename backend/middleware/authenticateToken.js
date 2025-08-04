const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token is provided
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Get the actual token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifies the token
    req.user = decoded; // Attach user info (e.g., userId, isAdmin) to request object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};




module.exports = { authenticateToken };
