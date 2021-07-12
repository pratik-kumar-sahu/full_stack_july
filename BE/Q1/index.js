const express = require("express");
const multer = require("multer");
const combineTextImage = require("./processImage");

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "image.png");
  },
});

const upload = multer({ storage: storage }).single("image");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Hello World!!",
  });
});

app.get("/image", (req, res) => {
  res.sendFile(`${__dirname}/uploads/image.png`);
});

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send("Something went wrong");
    }

    combineTextImage(req.body.name);

    res.json({
      status: "success",
      message: "New image created go to '/image' route",
      uploadedImage: req.file,
    });
  });
});

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
