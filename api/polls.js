const express = require("express");
const router = express.Router();
const { Poll } = require("../database");

router.get("/", async (req, res) => {
  try {
    const polls = await Poll.findAll();
    res.status(200).json(polls);
  } catch (error) {
    console.error("Failed to fetch poll data", error);
  }
});
module.exports = router;
