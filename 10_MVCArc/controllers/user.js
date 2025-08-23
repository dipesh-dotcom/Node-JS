const User = require("../models/users");

const hanldeGetAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  return res.status(200).json(allUsers);
};
const hanldeUpdateUserById = async (req, res) => {
  const body = req.body;
  await User.findByIdAndUpdate(req.params.id, body);
  return res.status(201).json({ msg: "User updated" });
};
const handleGetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ mag: "Data is not available" });
  return res.status(200).json(user);
};
const handleDeleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.status(204).json({ msg: "deleted" });
};
const hanldePostUsers = async (req, res) => {
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
};

module.exports = {
  hanldeGetAllUsers,
  handleDeleteUserById,
  handleGetUserById,
  hanldePostUsers,
  hanldeUpdateUserById,
};
