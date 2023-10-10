const ClothingItem = require("../models/clothingItem");
const { CREATED, FORBIDDEN } = require("../utils/errors");
const { handleHttpError } = require("../utils/errorHandlers");

const createItem = (req, res) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(CREATED).send({ data: item });
    })
    .catch((err) => {
      handleHttpError(req, res, err);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      handleHttpError(req, res, err);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      console.log(item);
      if (userId !== item.owner.toString()) {
        return res.status(FORBIDDEN).send({ message: "Access denied" });
      } else {
        ClothingItem.findByIdAndRemove(itemId)
          .orFail()
          .then((item) => res.send(item))
          .catch((err) => {
            handleHttpError(req, res, err);
          });
      }
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.status(CREATED).send({ data: item }))
    .catch((err) => {
      handleHttpError(req, res, err);
    });
};

const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      handleHttpError(req, res, err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
