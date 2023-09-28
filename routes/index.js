const router = require("express").Router();
const itemRouter = require("../routes/clothingItems");
const userRouter = require("../routes/users");

router.use("/items", itemRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
