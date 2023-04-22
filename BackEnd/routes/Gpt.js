const express = require("express");
const router = express.Router();
const gptController = require("../controllers/Gpt");

router.post("", gptController.gpt);

module.exports = gpt;