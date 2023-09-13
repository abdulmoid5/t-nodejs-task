import { Request, Response, Application, NextFunction } from "express";
import { registerUser } from "../controllers/unauth/register";
const multer = require("multer");
const { loginUser } = require("../controllers/unauth/login");
// const { registerUser } = require("../controllers/unauth/register");
const router = require("express").Router();

const nocache = (_: Request, resp: Response, next: NextFunction) => {
  resp.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  resp.header("Expires", "-1");
  resp.header("Pragma", "no-cache");
  next();
};

module.exports = function (app: Application) {
  router.post("/signup", registerUser);
  router.post("/login", loginUser);
  app.use(multer().none());
  app.use("/", router);
};
