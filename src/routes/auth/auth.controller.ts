import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";
import jwtGen from "../../util/jwt-generate";
import { respone } from "../../payload/respone/defaultRespone";
import { tokenResponse } from "../../payload/respone/tokenResponse";

async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    if (email == null || password == null || name == null) {
      respone(res, null, "bad request", 400);
      return;
    }

    const checkUser = await authService.getUserByEmail(email);
    if (checkUser != null) {
      respone(res, null, "User already exist! Please login!", 409);
      return;
    }

    const user = await authService.signupService(req.body);
    respone(res, user, "Singup user successfully", 201);
  } catch (error) {
    respone(res, null, `${error}`, 500);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (email == null || password == null) {
      respone(res, null, "bad request", 400);
      return;
    }
    const user = await authService.loginService(req.body);

    if (user) {
      const token = jwtGen.jwtGenerator(user);
      res.cookie("token", token.accessToken, {
        httpOnly: true,
      });
      tokenResponse(
        res,
        user,
        token.accessToken,
        token.refreshToken,
        "Login user successfully",
        200
      );
    } else {
      respone(res, null, "Something went wrong!", 500);
    }
  } catch (error: any) {
    respone(res, null, `${error}`, 500);
  }
}
export default {
  signUp,
  login,
};
