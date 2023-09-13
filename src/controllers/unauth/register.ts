import { Request, Response } from "express";
import { EmailValidator, ErrorHandler, Validator } from "../../helper/Errors";
import { config } from "../../config";
import { SuccessHandler } from "../../helper/Success";
import { ErrorCodes } from "../../helper/ErrorCodes";
import { uuidv4 } from "../../utils/uuidv4";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

export const registerUser = async (req: Request, resp: Response) => {
  try {
    const first_name = Validator(
      resp,
      req.body.first_name,
      "first_name",
      "First Name "
    );
    if (!first_name) return;
    const last_name = Validator(
      resp,
      req.body.last_name,
      "last_name",
      "Last Name "
    );
    if (!last_name) return;
    const phone_number = Validator(
      resp,
      req.body.phone_number,
      "phone_number",
      "Phone Name "
    );
    if (!phone_number) return;
    const email = EmailValidator(resp, req.body.email, "email", "Email ");
    if (!email) return;
    const password = Validator(resp, req.body.password, "password", "Pasword ");
    if (!password) return;

    let encrptedPassword = password;

    const hashRes = await bcrypt.hash(password, saltRounds);
    if (!hashRes) {
      new ErrorHandler(
        resp,
        ErrorCodes.somethingwentwrong,
        "Something went wrong!"
      );
      return;
    }

    encrptedPassword = hashRes;

    const userId = uuidv4();
    const token = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: config.jwtExpiresIn,
      }
    );

    const user = {
      uid: userId,
      first_name,
      last_name,
      phone_number,
      email,
      token,
      password: encrptedPassword,
    };
    new SuccessHandler(resp, user, 200, "Register Success");
  } catch (error) {
    new ErrorHandler(
      resp,
      ErrorCodes.somethingwentwrong,
      "Something went wrong!"
    );
  }
};
