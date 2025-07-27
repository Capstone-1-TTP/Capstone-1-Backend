const express = require("express");
const router = express.Router();
const { Option } = require("../database");

router.get("/", async (req, res) => {
  try {
    const options = await Option.findAll();
    res.status(200).json(options);
  } catch (error) {
    console.error("Failed to fetch options data:", error);
    res.status(500).json({error: "Internal server error, failed to fetch options data"});
  }
});

router.get("/:id", async (req, res) => {
  try {
    const option = await Option.findByPk(req.params.id);
    if (option) {
      res.status(200).json(option);
    } else {
      console.error("Option not found:", error);
      res.status(404).json({ error: "Option not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error, failed to fetch the specified poll data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const option = await Option.create(req.body);
    res.status(201).json(option);
  } catch (error) {
    console.error("Failed to create option:", error);
    res.status(400).json({ error: "Failed to create option" });
  }
});

router.patch("/:id", async (req, res) => {
  try{
    const option = await Option.findByPk(req.params.id);
    if (!option) {
      return res.status(404).json({error: "Option not found"});
    }
    const { details } = req.body;
    await option.update({
      details: details,
    });
    res.json({
      message: `Option has been updated with details "${option.details}"`,
      option: option,
    });
  } catch(error) {
    console.error("Failed to update option:", error);
    res.status(500).json({ error: "Internal server error: failed to update option" });
  }
});

router.delete("/:id", async (req, res) =>{
  try {
    const option = await Option.findByPk(req.params.id);
    if (!option) {
      return res.status(404).json({error: "Option not found"});
    }
    await option.destroy();
    res.status(200);
  } catch (error) {
    console.error("Failed to delete option:", error);
    res.status(500).json({ error: "Internal server error: failed to delete option" });
  }
});

module.exports = router;
