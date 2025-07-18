const express = require("express");
const router = express.Router();
const testDbRouter = require("./test-db");
const polls = require("./polls");
const app = express();

router.use("/polls", polls);
router.use("/test-db", testDbRouter);
app.use(express.json());



module.exports = router;
