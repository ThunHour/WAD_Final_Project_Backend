import { Application } from "express";
import expressLoader from "./express";
export default async (expressApp: Application) => {
  expressLoader(expressApp);
};
