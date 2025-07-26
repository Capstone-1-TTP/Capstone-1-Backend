const express = require("express");
const router = express.Router();
const { Poll } = require("../database");
const { json } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const polls = await Poll.findAll();
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({error: "Failed to fetch poll data within postman"});
    console.error("Failed to fetch poll data", error);
  }
});

router.get("/mypolls/:userId", async (req, res) => {
  const userId = Number(req.params.userId); 
  try {
    console.log("Fetching user's polls");
    const polls = await Poll.findAll({ where: { userId: userId } });
    console.log(`Found ${polls} polls for user ${req.params.userId}`);
    if (polls.length > 0) {
      res.status(200).json(polls);
    } else {
      res.status(404).json({ error: "No polls found for this user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user's polls" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const polls = await Poll.findByPk(req.params.id);
    if (polls) {
      res.json(polls);
    } else {
      res.status(404).json({ error: "Poll not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the specified poll data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const polls = await Poll.create(req.body);
    res.status(201).json(polls);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) =>{
  try {
    const polls = await Poll.findByPk(req.params.id);
    if (!polls) {
      return res.status(404).json({error: "Poll not found"});
    }
    await polls.destroy();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const poll = await Poll.findByPk(req.params.id);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }
    const {title, description} = req.body;
    await poll.update({
      title,
      description,
    }); 
    res.json({
      message: `Poll titled ${poll.title} has been updated.`,
      Poll: poll,
    });
  } catch (error) {
    console.error("PUT error occurred:", error);
    res.status(500).json({ error: "Failed to update polls" });
  }
});

router.patch("/:id", async (req, res) => {
  try{
    const poll = await Poll.findByPk(req.params.id);
    if (!poll) {
      return res.status(404).json({error: "Poll not found"});
    }
    const {title, description} = req.body;
    await poll.update({
      title,
      description,
    });
    res.json({
      message: `Poll titled "${poll.title}" has been updated.`,
      Poll: poll,
    });
  } catch(error) {
    console.error("PATCH error occurred:", error);
    res.status(500).json({ error: "Failed to update poll..." });
  }
});

module.exports = router;
