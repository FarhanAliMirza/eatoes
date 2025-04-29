const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({message: "No token"});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.phone = decoded.phone;
    next();
  } catch (err) {
    return res.status(403).json({message: "Invalid token"});
  }
};

module.exports = {
  authMiddleware,
};