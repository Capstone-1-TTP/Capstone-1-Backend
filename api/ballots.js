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
        console.error("Error fetching ballots");
        res.status(500).json({ error: "Error fetching ballots"});
    }
});

// Route and controller for displaying (GET) all of my saved ballots
router.get("/savedBallots", authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;
        const savedBallots = await Ballot.findAll({ where: {userId, isSubmitted: false}});
        res.status(200).json(savedBallots);
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
        res.status(200).json(submittedBallots);
    } catch (error) {
        console.error("Error fetching submitted ballots");
        res.status(500).json({ error: "Error fetching submitted ballots"});
    }
});

// Route and controller for viewing a ballot
router.get("/:id", authenticateJWT, async(req, res) => {
    try {
        const ballot = await Ballot.findOne({ where: {id: req.params.id, userId: req.user.id}});

        if (!ballot) {
            return res.status(404).json({ error: "Ballot not found"});
        }
        res.status(200).json(ballot);
    } catch (error) {
        console.error("Error fetching ballot");
        res.status(500).json({ error: "Error fetching ballot" })
    }
});


// ---------------------------------------------- Routes for a ballot (CRUD) ----------------------------------------------

// Route and controller for submitting a ballot
router.post("/submit", authenticateJWT, async (req, res) => {
    try {
        const newBallot = await Ballot.create({
            userId: req.user.id,
            pollId: req.body.pollId,
            optionsRanking: req.body.optionsRanking,
            isSubmitted: true,
        });

        res.status(201).json({ message: "Ballot updated successfully", newBallot });
    } catch (error) {
        console.error("Error submitting ballot");
        res.status(500).json({ error: "Error submitting ballot"})
    }
});

// Router and controller for saving a ballot
router.post("/save", authenticateJWT, async (req, res) => {
    try {
        const newSavedBallot = await Ballot.create({
            userId: req.user.id,
            pollId: req.body.pollId,
            optionsRanking: req.body.optionsRanking,
            isSubmitted: false,
        });

        res.status(201).json({ message: "Ballot saved successfully", newSavedBallot });
    } catch (error) {
        console.error("Error saving ballot");
        res.status(500).json({ error: "Error saving ballot"})
    }
});

// Router and controller for updating a ballot
router.patch("/:id", authenticateJWT, async (req, res) => {
    try {
        // Get ballot id and user id
        const { id } = req.params;
        const userId = req.user.id;
        // fields to be updated
        const { optionsRanking, isSubmitted } = req.body;

        // find ballot to check if it exists and update it
        const ballot = await Ballot.findOne({ where: { id, userId}});

        if (!ballot) {
            return res.status(404).json({ error: "Ballot not found" });
        }

        // In the database, update only the options that were actually changed, otherwise don't update
        if (optionsRanking !== undefined) ballot.optionsRanking = optionsRanking;

        //save to database
        await ballot.save();

        res.status(200).json({ message: "Ballot updated successfully", ballot});
    } catch (error) {
        console.error("Error updating ballot");
        res.status(500).json({ error: "Error updating ballot"});
    }
});

// Router and controller for deleting a ballot
router.delete("/:id", authenticateJWT, async(req, res) => {
    try {
        // Get ballot id and user id
        const { id } = req.params;
        const userId = req.user.id;

        // find ballot to delete
        const ballot = await Ballot.findOne({ where: { id, userId}});

        if (!ballot) {
            return res.status(404).json({ error: "Ballot not found" });
        }

        res.status(200).json({ message: "Ballot deleted successfully" });
    } catch (error) {
        console.error("Error deleting ballot");
        res.status(500).json({ error: "Error deleting ballot" });
    }
});



module.exports = router;