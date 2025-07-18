const express = require("express");
const router = express.Router();
const savedItemController = require("../controllers/savedItemController");
const auth = require("../middleware/auth");

router.get("/", auth, savedItemController.getSavedItems);
router.post("/toggle", auth, savedItemController.toggleSavedItem);

module.exports = router;
