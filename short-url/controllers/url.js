const mongoose = require("mongoose");
const URL = require("../models/url");

const { nanoid } = require("nanoid");

const handleGenerateShortUrl = async (req, res) => {
  const body = req.body;
  console.log(body);

  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortId = nanoid(8);

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render("home", { id: shortId });
};

const handleGetHistory = async (req, res) => {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });

  return res.status(200).json({
    totoalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
module.exports = {
  handleGenerateShortUrl,
  handleGetHistory,
};
