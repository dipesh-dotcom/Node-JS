const express = require("express");
const {
  hanldeGetAllUsers,
  handleDeleteUserById,
  handleGetUserById,
  hanldePostUsers,
  hanldeUpdateUserById,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(hanldeGetAllUsers).post(hanldePostUsers);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(hanldeUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
