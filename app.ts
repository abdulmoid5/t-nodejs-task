import { Request, Response } from "express";

require("dotenv").config();
const express = require("express");
// require("./src/config/databse");

const app = express();
const cors = require("cors");
app.use(cors());
// app.use(multer().none()); //disable default multipart

// Set content type GLOBALLY for any response.
app.use(function (req: Request, res: Response, next: Function) {
  if (
    req.headers["content-type"] &&
    req.headers["content-type"].includes("text/plain")
  ) {
    req.headers["content-type"] = "application/json";
  }
  next();
});

// this will let us get the data from a POST
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Theo application." });
});

require("./src/routes/auth.routes")(app);
require("./src/routes/unauth.routes")(app);

module.exports = app;
