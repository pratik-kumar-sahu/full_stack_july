const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_URL}&language=en-US&page=1`;

mongoose
  .connect(
    "mongodb+srv://backendpro:12334455@@cluster-backend-attainu.6rqij.mongodb.net/projectMovies?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("DB Connection Success"))
  .catch((err) => console.log(err.message));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello World",
  });
});

app.get("/movies", async (req, res) => {
  try {
    const popularMovies = await axios({
      method: "GET",
      url: API,
    });
    res.status(200).json({
      status: "success",
      data: popularMovies.data,
    });
  } catch (err) {
    console.log(err);
  }
});

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
