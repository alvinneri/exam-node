const express = require("express");

const router = express.Router();
const messageRoute = require("./message");

router.use("/api/message", messageRoute);

module.exports = router;
