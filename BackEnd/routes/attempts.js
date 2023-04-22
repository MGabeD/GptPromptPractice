const express = require("express");
const router = express.Router();
const attemptController = require("../controllers/attempt");

router.put("/:id", attemptController.addAttempt);

module.exports = router;