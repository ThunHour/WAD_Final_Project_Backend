import { Response, Request, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export const authorizeUser = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    console.log(token);

    const getUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userById = (await prisma.user.findUnique({
      where: { id: getUser.id },
    })) as User;
    if (userById.role !== role) {
      return res.status(403).send({ message: "Forbidden" });
    }
    next();
  };
};
