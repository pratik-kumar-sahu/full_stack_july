const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.json({
        status: "Failure",
        message: "Auth token not found",
      });
    }

    const decoded = jwt.decode(token);

    if (!decoded) {
      return res.json({
        status: "Failure",
        message: "Unauthorised entry",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.json({
      status: "Failure",
      message: "Token not found",
    });
  }
};

module.exports = auth;
