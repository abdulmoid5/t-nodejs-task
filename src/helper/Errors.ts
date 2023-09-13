const ErrorCodes = require("./ErrorCodes");
import { Response } from "express";

export class ErrorHandler {
  constructor(resp: Response, code: number, msg: string) {
    resp.status(500).send({
      errorCode: code || ErrorCodes.somethingwentwrong,
      errorMsg: msg || "Something went wrong!",
    });
  }
} // end of class

export const Validator = (
  resp: Response,
  key: any,
  usageKey: string,
  paramName: string
) => {
  if (key) {
    return key;
  }
  resp.status(404).send({
    errorCode: ErrorCodes.parameterMissing,
    errorMsg: `${`${paramName}`.trim()} is required!`,
    key: `You must have to use ${usageKey}`,
  });
  return false;
};
export const UserIDValidator = (resp: Response, key: any) => {
  if (key) {
    return key;
  }
  resp.status(404).send({
    errorCode: ErrorCodes.userNotFound,
    errorMsg: `User not found!`,
  });
  return false;
};

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const EmailValidator = (
  resp: Response,
  key: any,
  usageKey: string,
  paramName: string
) => {
  if (key) {
    if (validateEmail(key)) {
      return key;
    }
    resp.status(500).send({
      errorCode: ErrorCodes.parameterMissing,
      errorMsg: `${`${paramName}`.trim()} is invalid format!`,
    });
    return false;
  } else {
    resp.status(404).send({
      errorCode: ErrorCodes.parameterMissing,
      errorMsg: `${`${paramName}`.trim()} is required!`,
      key: `You must have to use ${usageKey}`,
    });
    return false;
  }
};

export const UnauthorizedError = (resp: Response) => {
  return resp.status(401).send({
    errorCode: ErrorCodes.unauthorized,
    errorMsg: `Unauthorized!`,
  });
};
export const TokenMissing = (resp: Response) => {
  return resp.status(403).send({
    errorCode: ErrorCodes.tokenMissing,
    errorMsg: `No token provided!`,
  });
};
export const TokenExpired = (resp: Response) => {
  return resp.status(403).send({
    errorCode: ErrorCodes.tokenExpired,
    errorMsg: `Token expired!`,
  });
};
