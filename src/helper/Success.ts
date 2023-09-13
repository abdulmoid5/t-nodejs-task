import { Response } from "express";

export class SuccessHandler {
  constructor(resp: Response, data: any, code: number, msg: string) {
    resp.status(200).send({
      success: code || 200,
      ...(msg && {
        message: msg,
      }),
      ...(data && {
        data: data,
      }),
    });
  }
} // end of class

