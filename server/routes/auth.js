const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// POST: /api/auth/register
router.post("/register", async (req, res, next) => {
  const { fullName, studentId, department, email, password } = req.body;

  try {
    const newUser = new User({ fullName, studentId, department, email });
    const registeredUser = await User.register(newUser, password);

    // Automatically log the user in after registration
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      return res.status(201).json({
        message: "Registration successful",
        user: {
          id: registeredUser._id,
          fullName: registeredUser.fullName,
          studentId: registeredUser.studentId,
          department: registeredUser.department,
          email: registeredUser.email,
          role: registeredUser.role,
        },
      });
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// POST: /api/auth/login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: info?.message || "Invalid credentials" });
    }

    req.login(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          fullName: user.fullName,
          studentId: user.studentId,
          department: user.department,
          email: user.email,
          role: user.role,
        },
      });
    });
  })(req, res, next);
});


// GET: /api/auth/me (Check login status on page refresh)
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ user: req.user });
  }
  return res.status(401).json({ user: null });
});


// POST: /api/auth/logout
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

module.exports = router;