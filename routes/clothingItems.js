const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

// Create item
router.post("/", createItem);

// Read item
router.get("/", getItems);

// Delete item
router.delete("/:itemId", deleteItem);

// Like item
router.put("/:itemId/likes", likeItem);

// Unlike item
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
