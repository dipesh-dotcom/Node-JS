const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/node-exp")
  .then(() => console.log("MongoDB started"))
  .catch((err) => console.log("Mongo Error", err));

// Middleware
app.use(express.urlencoded({ extended: false }));

// Creating Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    gender: {
      type: String,
      require: true,
    },
    jobTitle: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

// Creating Model
const User = mongoose.model("user", userSchema);

// Route
app.post("/api/user", async (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All field are required" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "Created Successfully", data: result });
});

app.get("/users", async (req, res) => {
  const allUsers = await User.find({});
  const html = `
      <ul>
          ${allUsers
            .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
            .join("")}  
      </ul>
      `;
  return res.status(200).send(html);
});

app.get("/api/users", async (req, res) => {
  const allUsers = await User.find({});
  return res.status(200).json(allUsers);
});

app
  .route("/api/user/:id")
  .get(async (req, res) => {
    const user = User.findById(req.params.id);
    if (!user) return res.status(404).json({ mag: "Data is not available" });
    return res.status(200).json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Stha" });

    return res.status(201).json({ msg: "User updated" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.status(204).json({ msg: "deleted" });
  });

app.listen(port, () => console.log(`Server listen on port ${port}`));
