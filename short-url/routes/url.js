const express = require("express");

const {
  handleGenerateShortUrl,
  handleGetHistory,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateShortUrl);
router.get("/analytics/:shortId", handleGetHistory);
module.exports = router;
