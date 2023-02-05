import { Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import { PrismaClient, User } from "@prisma/client";
import config from "../config/config";
const prisma = new PrismaClient();

export const authorizeUser = (role: string) => {
  return async (req: any, res: Response, next: NextFunction) => {
    const token = req.header["authorization"].split(" ")[1];
    const getUser = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    const userById = (await prisma.user.findUnique({
      where: { id: getUser.id },
    })) as User;
    if (userById.role !== role) {
      return res.status(403).send({ message: "Forbidden" });
    }
    next();
  };
};
