const router = require("express").Router();

const { handleAuthorization } = require("../middleware/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

// Create item
router.post("/", handleAuthorization, createItem);

// Read item
router.get("/", getItems);

// Delete item
router.delete("/:itemId", handleAuthorization, deleteItem);

// Like item
router.put("/:itemId/likes", handleAuthorization, likeItem);

// Unlike item
router.delete("/:itemId/likes", handleAuthorization, unlikeItem);

module.exports = router;
