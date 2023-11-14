const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { handleAuthorization } = require("../middleware/auth");
const { validateUserUpdate } = require("../middleware/validation");

router.get("/me", handleAuthorization, getCurrentUser);
router.patch("/me", handleAuthorization, validateUserUpdate, updateUser);

module.exports = router;
