const express = require("express");
const router = express.Router();
const testDbRouter = require("./test-db");
const polls = require("./polls");

router.use("/polls", polls);
router.use("/test-db", testDbRouter);



module.exports = router;
