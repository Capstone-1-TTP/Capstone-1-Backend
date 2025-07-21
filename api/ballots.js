const express = require("express");
const router = express.Router();
const { Ballot } = require("../database");
const { authenticateJWT } = require("../auth");

// ---------------------------------------------- Routes for "Ballots" page ----------------------------------------------

// Route and controller for displaying (GET) all of my ballots
router.get("/allMyBallots", authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;
        const ballots = await Ballot.findAll({where: {userId}});
        res.status(200).json(ballots);
    } catch (error) {
        console.error("Error fetching ballots:");
        res.status(500).json({ error: "Error fetching ballots"});
    }
});

// Route and controller for displaying (GET) all of my saved ballots
router.get("/savedBallots", authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;
        const savedBallots = await Ballot.findAll({ where: {userId, isSubmitted: false}});
    } catch (error) {
        console.error("Error fetching saved ballots");
        res.status(500).json({ error: "Error fetching saved ballots"});
    }
});

// Route and controller for displaying (GET) all of my submitted ballots
router.get("/submittedBallots", authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;
        const submittedBallots = await Ballot.findAll({ where: {userId, isSubmitted: True}});
    } catch (error) {
        console.error("Error fetching submitted ballots");
        res.status(500).json({ error: "Error fetching submitted ballots"});
    }
});


// ---------------------------------------------- Routes for a ballot ----------------------------------------------



module.exports = router;