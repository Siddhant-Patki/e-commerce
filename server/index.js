const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();
const mongoUri = process.env.MONGODB_URI;

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// mount all routes
app.use(routes);

// connect mongo
connectDB(mongoUri);

// start server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
