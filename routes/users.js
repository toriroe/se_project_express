const router = require("express").Router();

const { createUser, getUsers, getUser } = require("../controllers/users");

// Create new user
router.post("/", createUser);

// Return all users

router.get("/", getUsers);

// Return user by ID
router.get("/:userId", getUser);

module.exports = router;
