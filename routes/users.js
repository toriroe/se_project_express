const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { handleAuthorization } = require("../middleware/auth");

router.get("/me", handleAuthorization, getCurrentUser);
router.patch("/me", handleAuthorization, updateUser);

module.exports = router;
