import dotenv from "dotenv";
import path from "path";
dotenv.config();
dotenv.config({ path: path.join(__dirname, "../../.env") });
import firebase from "./firebase/firebase.config";
export default {
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET,
  ...firebase,
};
