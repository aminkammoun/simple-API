const mongoose = require("mongoose");

const voyages = require("./routes/voyage");
const express = require("express");
const app = express();
app.use(express.static("./public"));
app.use(express.static("./uploads"));

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log("connect to db");
  })
  .catch((err) => {
    console.log("problem to connect to data base ", err);
  });

app.use(express.json());

app.use("/api/voyage", voyages);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
