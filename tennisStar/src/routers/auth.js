const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = Router();

// Google authentication route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login-failure",
  }),
  (req, res) => {
    // Create JWT token
    const token = jwt.sign(
      { sub: req.user._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "7d" }
    );

    // Redirect to success page with token
    res.redirect(
      `${
        process.env.FRONTEND_URL || "http://localhost:3000"
      }/login-success?token=${token}`
    );
  }
);

module.exports = router;
