const express = require("express");
const router = express.Router();
const testDbRouter = require("./test-db");
const polls = require("./polls");
const ballots = require("./ballots");

router.use("/polls", polls);
router.use("/test-db", testDbRouter);
router.use("/ballots", ballots);


module.exports = router;
