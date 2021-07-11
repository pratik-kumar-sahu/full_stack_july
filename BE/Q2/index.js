const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./Model/User");
const auth = require("./Auth/auth");
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

app.post("/signup", async (req, res) => {
  try {
    let userData = req.body;

    let foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      return res.send({
        status: "failure",
        message: "Email already registered",
      });
    }

    let regUser = new User({ ...userData });

    const hashPassword = await bcrypt.hash(userData.password, 10);
    regUser.password = hashPassword;

    const token = await jwt.sign(
      { email: regUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await regUser.save();

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
    });
  } catch (err) {
    console.log("error");
  }
});

app.post("/login", async (req, res) => {
  try {
    let userData = req.body;

    let foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.send({
        status: "failure",
        message: "Email not registered",
      });
    }

    const comparePassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    if (!comparePassword) {
      return res.send({
        status: "Failure",
        message: "Invalid Password",
      });
    }

    const token = await jwt.sign(
      { email: foundUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "success",
      message: "User login successful",
      token,
    });
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/addToWatchList/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const foundUser = await User.findOne({ email: req.user.email });

    if (!foundUser) {
      return res.json({
        status: "Failure",
        message: "Login to add course to WatchList",
      });
    }

    if (foundUser.watchList.includes(id)) {
      return res.json({
        status: "Failure",
        message: "Movie already in WatchList",
      });
    }

    foundUser.watchList.push(id);
    await foundUser.save();

    return res.json({
      status: "success",
      message: foundUser,
    });
  } catch (err) {}
});

app.get("/watchlist", auth, async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.user.email });

    const {
      data: { results },
    } = await axios({
      method: "GET",
      url: API,
    });

    const watchList = results.filter((movie) =>
      foundUser.watchList.includes(movie.id)
    );

    res.json({
      status: "success",
      watchList: watchList,
    });
  } catch (err) {}
});

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
