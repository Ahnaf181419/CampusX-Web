// server/middleware/authMiddleware.js
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: "You must be logged in to do this" });
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "Admin") {
    return next();
  }
  return res.status(403).json({ error: "Forbidden: Admin access required" });
};

module.exports = { isAuthenticated, isAdmin };