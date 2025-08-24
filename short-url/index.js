const express = require("express");

const urlRouter = require("./routes/url");
const connectMongoDb = require("./connect");
const URL = require("./models/url");
const PORT = 8000;
const app = express();

// Db connection
connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB connnected.")
);

// Middleware
app.use(express.json());

// Router
app.use("/url", urlRouter);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectURL);
});
app.listen(PORT, console.log(`Server listen on PORT: ${PORT}`));
