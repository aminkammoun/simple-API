const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
});

const Custumers = mongoose.model("custumer", genreSchema);

router.get("/", async (req, res) => {
  const custumer = await Custumers.find().sort("name");
  res.send(custumer);
});

router.post("/", async (req, res) => {

  let custumer = new Custumers({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  custumer = await custumer.save();
  res.send(custumer);
});

router.put("/:id", async (req, res) => {
  const custumer = await Custumers.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    new: true,
  });
  if (!custumer)
    return res
      .status(404)
      .send("The custumer with the given ID was not found.");

  res.send(custumer);
});

router.delete("/:id", async (req, res) => {
  const custumer = await Custumers.findByIdAndRemove(req.params.id);

  if (!custumer)
    return res
      .status(404)
      .send("The custumer with the given ID was not found.");

  res.send(custumer);
});

router.get("/:id", async (req, res) => {
  const custumer = await Custumers.findById(req.params.id);
  if (!custumer)
    return res
      .status(404)
      .send("The custumer with the given ID was not found.");
  res.send(custumer);
});

function validateGenre(custumer) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.Boolean,
  };

  return Joi.validate(custumer, schema);
}

module.exports = router;
