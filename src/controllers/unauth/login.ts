// const { connection } = require("../../config/databse");
import { Request, Response } from "express";
import { ErrorCodes } from "../../helper/ErrorCodes";
import { ErrorHandler } from "~/helper/Errors";
import { SuccessHandler } from "~/helper/Success";

// const {
//   ErrorHandler,
//   DBQueryError,
//   Validator,
//   EmailValidator,
// } = require("../../helper/Errors");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const login = async (req: Request, resp: Response) => {
  try {
    // const email = EmailValidator(resp, req?.body.email, "email", "Email ");
    // if (!email) return;
    // const password = Validator(resp, req?.body.password, "password", "Pasword ");
    // if (!password) return;

    new SuccessHandler(
      resp,
      null,
      ErrorCodes.userNotFound,
      "Invalid Credentials!"
    );
    return;

    // const query = `SELECT * FROM users WHERE email='${email}' LIMIT 1`;
    // connection.query(query, async function (err, result) {
    //   if (err) {
    //     DBQueryError(resp, err);
    //     return;
    //   }
    //   if (result.length == 0) {
    //     new SuccessHandler(
    //       resp,
    //       null,
    //       LoginErrorCodes.userNotFound,
    //       "User does not exist!"
    //     );
    //     return;
    //   }

    //   const hashedPassword = result[0].password;
    //   //get the hashedPassword from result
    //   if (await bcrypt.compare(password, hashedPassword)) {
    //     let user = JSON.parse(JSON.stringify(result[0]));
    //     delete user["password"];

    //     const token = jwt.sign(
    //       {
    //         userId: user.id,
    //       },
    //       process.env.JWT_SECRET_KEY,
    //       {
    //         expiresIn: config.jwtExpiresIn,
    //       }
    //     );

    //     new SuccessHandler(resp, { ...user, token });
    //     return;
    //   } else {
    //     new SuccessHandler(
    //       resp,
    //       null,
    //       LoginErrorCodes.userNotFound,
    //       "Invalid Credentials!"
    //     );
    //     return;
    //   } //end of bcrypt.compare()
    // });
  } catch (error) {
    new ErrorHandler(
      resp,
      ErrorCodes.somethingwentwrong,
      "Something went wrong!"
    );
  }
  return;
};

module.exports.loginUser = login;
