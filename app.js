const mongoose = require("mongoose");
const custumers = require("./routes/custumers");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log("connect to db");
  })
  .catch(() => {
    console.log("problem to connect to data base");
  });

app.use(express.json());
app.use("/api/customers", custumers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
