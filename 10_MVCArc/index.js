const express = require("express");

const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");

const port = 8000;
const app = express();

// MongoDB connection

connectMongoDb("mongodb://127.0.0.1:27017/node-exp").then(
  console.log("Monogodb started")
);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Router
app.use("/api/users", userRouter);

app.listen(port, () => console.log(`Server listen on port ${port}`));
