import bcrypt from "bcrypt";

const saltRounds = 10;

export const encryptPassword = async (password:string) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePassword = async (password:string, hash:string) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};
