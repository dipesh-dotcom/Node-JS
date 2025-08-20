const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello for HomePage");
});

app.get("/about", (req, res) => {
  res.send("Hello, I am Dipesh");
});

app.listen(port, () => console.log(`Server listen on port ${port}`));
