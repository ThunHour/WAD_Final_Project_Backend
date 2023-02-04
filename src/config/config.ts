import dotenv from "dotenv";
import path from "path";
dotenv.config();
dotenv.config({ path: path.join(__dirname, "../../.env") });
import firebase from "./firebase/firebase.config";
export default {
  PORT: process.env.PORT || 8080,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  CLIENT_ID_FB: process.env.CLIENT_ID_FB,
  CLIENT_SECRET_FB: process.env.CLIENT_SECRET_FB,
  ...firebase,
};
