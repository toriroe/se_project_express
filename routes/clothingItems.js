const router = require("express").Router();
const { handleAuthorization } = require("../middleware/auth");
const { validateItemBody, validateId } = require("../middleware/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

// Read item
router.get("/", getItems);

// Create item
router.post("/", handleAuthorization, validateItemBody, createItem);

// Delete item
router.delete("/:itemId", handleAuthorization, validateId, deleteItem);

// Like item
router.put("/:itemId/likes", handleAuthorization, validateId, likeItem);

// Unlike item
router.delete("/:itemId/likes", handleAuthorization, validateId, unlikeItem);

module.exports = router;
