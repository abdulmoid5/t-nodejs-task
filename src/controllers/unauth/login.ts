import { Request, Response } from "express";
import { ErrorCodes } from "../../helper/ErrorCodes";
import { EmailValidator, ErrorHandler, Validator } from "../..//helper/Errors";
import { SuccessHandler } from "../../helper/Success";
import { uuidv4 } from "../../utils/uuidv4";
import { config } from "../../config";

const jwt = require("jsonwebtoken");

const SomePasswords = [
  "Aa@123456789",
  "Aa@12345",
  "123456789",
  "12345678",
  "12345",
  "admin",
];

const login = async (req: Request, resp: Response) => {
  try {
    const email = EmailValidator(resp, req?.body.email, "email", "Email ");
    if (!email) return;
    const password = Validator(
      resp,
      req?.body.password,
      "password",
      "Pasword "
    );
    if (!password) return;

    if (SomePasswords.includes(password)) {
      const user = {
        email,
        id: uuidv4(),
      };

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: config.jwtExpiresIn,
        }
      );

      new SuccessHandler(resp, { ...user, token }, 200, "Login Success");

      return;
    } else {
      new SuccessHandler(
        resp,
        null,
        ErrorCodes.userNotFound,
        "Invalid Credentials!"
      );
      return;
    }
  } catch (error) {
    new ErrorHandler(
      resp,
      ErrorCodes.somethingwentwrong,
      (error as { message: string }).message || "Something went wrong!"
    );
  }
  return;
};

module.exports.loginUser = login;
