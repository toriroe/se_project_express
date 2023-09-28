const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  updateItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

//CRUD

//Create
router.post("/", createItem);

//Read
router.get("/", getItems);

//Update
router.put("/:itemId", updateItem);

//Delete
router.delete("/:itemId", deleteItem);

//Like item
router.put("/:itemId/likes", likeItem);

//Unlike item
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
