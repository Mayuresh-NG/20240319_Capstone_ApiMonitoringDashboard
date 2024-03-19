const jwt = require("jsonwebtoken");

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error(err);
      // Handle unauthorized error
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    req.decoded = decoded;
    next();
  });
};

module.exports = { verifyToken };
