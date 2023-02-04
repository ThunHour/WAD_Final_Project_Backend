import { log } from "console";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import config from "../config/config";
export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // get token from bearer header
  if (!req.cookies.token) {
    return res.status(401).send({ message: "No token provided" });
  }
  // split bearer token into two parts
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ error: "No token provided" });
  }
  try {
    const decoded = await verify(token, process.env.ACCESS_TOKEN_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid token or expired" });
  }
};
