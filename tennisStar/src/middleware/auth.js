const passport = require("passport");

// Middleware to authenticate JWT token
const authenticateJWT = passport.authenticate("jwt", { session: false });

// Middleware to check if the user is the creator of the match
const isMatchCreator = async (req, res, next) => {
  try {
    // For Update/Delete operations, check if authenticated user is player1
    const match = await req.app.locals.Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({
        error: `Match with id ${req.params.id} not found..`,
      });
    }

    if (match.player1.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: "You don't have permission to modify this match..",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message + ".." });
  }
};

module.exports = {
  authenticateJWT,
  isMatchCreator,
};
