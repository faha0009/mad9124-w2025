const { Router } = require("express");
const courtController = require("../controllers/courts.js");
const router = Router();

router.post("/", courtController.createOne);
router.get("/", courtController.getAll);
router.get("/:id", courtController.getOne);
router.put("/:id", courtController.replaceOne);
router.patch("/:id", courtController.updateOne);
router.delete("/:id", courtController.deleteOne);

module.exports = router;