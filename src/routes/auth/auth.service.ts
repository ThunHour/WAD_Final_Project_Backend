import { PrismaClient } from "@prisma/client";
import { encryptPassword, comparePassword } from "../../util/passwordEncrypter";
const prisma = new PrismaClient();

async function signupService(data: any) {
  const harshPassword = await encryptPassword(data.password);
  return await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: harshPassword,
      phoneNumber: data.phoneNumber,
    },
  });
}

async function loginService(data: any) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    const err: any = new Error("User not found");
    err.status = "404";
    throw err;
  }
  const isPasswordValid = await comparePassword(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  return user;
}

async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export default {
  signupService,
  loginService,
  getUserByEmail,
};
