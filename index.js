const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// dotenv.config();
require('dotenv').config({ path: './config.env' });

const DB = process.env.MONGO_URL

mongoose.connect(DB,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true
  }).then(() => {
    console.log("Connection to database is successful");
  }).catch((err) => {
    console.log(`${err} : connection failed!....`);
  });

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
      error: err.message
  });
});


app.listen(8800, () => {
	console.log("Backend server is running");
});
