const express = require("express");

const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const connectMongoDb = require("./connect");
const URL = require("./models/url");
const PORT = 8000;
const app = express();

// Db connection
connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB connnected.")
);

//ejs configuration
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use("/url", urlRoute);
app.get("/url/:shortId", async (req, res) => {
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

app.use("/", staticRoute);
app.listen(PORT, console.log(`Server listen on PORT: ${PORT}`));
