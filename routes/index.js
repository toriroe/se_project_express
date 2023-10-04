const router = require("express").Router();
const itemRouter = require("./clothingItems");
const userRouter = require("./users");
const { NOT_FOUND } = require("../utils/errors");
const { application } = require("express");

router.use("/items", itemRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
