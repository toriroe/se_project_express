const ClothingItem = require("../models/clothingItem");
const { OK, CREATED } = require("../utils/errors");
const { handleItemHttpError } = require("../utils/errorHandlers");

const createItem = (req, res) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(CREATED).send({ data: item });
    })
    .catch((err) => {
      handleItemHttpError(req, res, err);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(OK).send(items))
    .catch((err) => {
      handleItemHttpError(req, res, err);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndRemove(itemId)
    .orFail()
    .then((item) => res.status(OK).send(item))
    .catch((err) => {
      handleItemHttpError(req, res, err);
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $set: { imageUrl } },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((item) => res.status(OK).send({ data: item }))
    .catch((err) => {
      handleItemHttpError(req, res, err);
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
      handleItemHttpError(req, res, err);
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
    .then((item) => res.status(OK).send({ data: item }))
    .catch((err) => {
      handleItemHttpError(req, res, err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  updateItem,
  likeItem,
  unlikeItem,
};
