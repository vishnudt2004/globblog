// Node module Imports
const express = require("express");

// Middleware Functions
const multerMW = require("../middlewares/multerMW");
const { deleteFileOnError } = multerMW;

// Controller Functions
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// internal module declarations
const router = express.Router();

router.route("/").get(getUsers);
router
  .route("/:id")
  .get(getUser)
  .patch(multerMW("user/profile"), updateUser, deleteFileOnError)
  .delete(deleteUser);

module.exports = router;
