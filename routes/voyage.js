const mongoose = require("mongoose");
const Joi = require("joi");

const express = require("express");
const app = express();
const router = express.Router();
const multer = require("multer");

var storage = multer.diskStorage({
  destination: 'uploads',
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname);
  },
});

const upload = multer({ storage: storage });
app.set("views", "./views");
app.set("view engine", "pug");

const genreSchema = new mongoose.Schema({
  depart: {
    type: String,
    required: true,
  },
  arrive: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
  },
  productImage: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.model("voyage", genreSchema);

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  console.log(genres);
  res.render("affiche.pug", {
    title: "Amine",
    voyages: genres,
  });
});

router.post("/", upload.single("productImage"), async (req, res) => {
  console.log(req.file);
  let genre = new Genre({
    depart: req.body.depart,
    arrive: req.body.arrive,
    prix: req.body.prix,
    productImage: req.file.path,
  });
  await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    depart: req.body.depart,
    new: true,
  });

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.render("affich_single.pug", {
    title: "Amine",
    voyages: genre,
  });
});

function validateGenre(genre) {
  const schema = {
    depart: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
