const express = require("express");
const router = express.Router();
const testDbRouter = require("./test-db");
const polls = require("./polls");
const ballots = require("./ballots");
const users = require("./users");


router.use("/polls", polls);
router.use("/test-db", testDbRouter);
router.use("/ballots", ballots);
router.use("/users", users);


module.exports = router;
