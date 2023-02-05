import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import config from "../config/config";
export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // get token from bearer header
  const authToken = req.header("Authorization");
  if (!authToken) {
    return res.status(401).send({ error: "No token provided" });
  }
  try {
    // split bearer token into two parts
    const token = authToken.split(" ")[1];
    const decoded = await verify(token, config.ACCESS_TOKEN_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid token or expired" });
  }
};
