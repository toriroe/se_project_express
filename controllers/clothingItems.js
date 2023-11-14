const ClothingItem = require("../models/clothingItem");

const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");
const ForbiddenError = require("../errors/forbidden-error");

const createItem = (req, res, next) => {
  const owner = req.user._id;
  const { name, imageUrl, weather } = req.body;

  ClothingItem.create({ name, imageUrl, weather, owner })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Validation Error"));
      } else {
        next(err);
      }
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("Error from deleteItem"))
    .then((item) => {
      if (userId !== item.owner.toString()) {
        throw new ForbiddenError("User not authorized to delete item");
      }
      return ClothingItem.findByIdAndRemove(itemId)
        .orFail(() => new NotFoundError("Error from deleteItem"))
        .then((removedItem) => res.send(removedItem))
        .catch(next);
    })
    .catch(next);
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("Error from likeItem"))
    .then((item) => res.status(201).send({ data: item }))
    .catch(next);
};

const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("Error from unlikeItem"))
    .then((item) => res.send({ data: item }))
    .catch(next);
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
