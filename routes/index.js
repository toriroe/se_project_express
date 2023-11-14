const router = require("express").Router();
const itemRouter = require("./clothingItems");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");
const {
  validateUserInfoBody,
  validateLoginAuthentication,
} = require("../middleware/validation");
const NotFoundError = require("../errors/not-found-error");

router.use("/items", itemRouter);
router.use("/users", userRouter);

router.post("/signin", validateLoginAuthentication, login);
router.post("/signup", validateUserInfoBody, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;
