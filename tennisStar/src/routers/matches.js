const { Router } = require("express");
const matchController = require("../controllers/matches.js");
const { authenticateJWT, isMatchCreator } = require("../middleware/auth");

const router = Router();

// All routes require JWT authentication
router.use(authenticateJWT);

// Routes
router.post("/", matchController.createOne);
router.get("/", matchController.getAll);
router.get("/:id", matchController.getOne);

// Update and delete routes require the user to be the creator of the match
router.put("/:id", isMatchCreator, matchController.replaceOne);
router.patch("/:id", isMatchCreator, matchController.updateOne);
router.delete("/:id", isMatchCreator, matchController.deleteOne);

module.exports = router;
