const express = require("express");
const mongoose = require("mongoose");
const rowdy = require("rowdy-logger");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;

//middleware
const rowdyLogger = rowdy.begin(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to database
const dbURL = process.env.MONGO_URL;

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is successfully connected");
  })
  .catch((error) => {
    console.log(error);
  });

//routes

app.get("/", (req, res) => {
  res.send({
    appName: "tuberDome",
  });
});

app.listen(PORT, () => {
  console.log(`tuberDome is listening at port: ${PORT}`);
  rowdyLogger.print();
});
