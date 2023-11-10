const router = require("express").Router();
const itemRouter = require("./clothingItems");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");
// const { NOT_FOUND } = require("../utils/errors");
const NotFoundError = require("../errors/not-found-error");

router.use("/items", itemRouter);
router.use("/users", userRouter);

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res, next) => {
  // res.status(NOT_FOUND).send({ message: "Router not found" });
  next(new NotFoundError("Router not found"));
});

module.exports = router;
