import { Application, Router } from "express";
import auth from "./auth";
import brand from "./brand/index";
import category from "./category/index";
import cases from "./case/index";
import ram from "./ram/index";
// import motherBoard from "./motherBoard/index";
import cpu from "./cpu/index";
import storage from "./storage/index";
import gpu from "./gpu/index";
import powerSupply from "./powerSupply/index";
import passport from "passport";
import "../config/google/google.config";
import Session from "express-session";

export default (app: Application) => {
  const route = Router();

  route.use(
    Session({
      secret: "somethingsecretgoeshere",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  );

  route.use(passport.initialize());
  route.use(passport.session());

  route.use("/auth", auth());
  route.use("/brand", brand());
  route.use("/category", category());
  route.use("/case", cases());
  route.use("/ram", ram());
  // route.use("/motherBoard", motherBoard());
  route.use("/cpu", cpu());
  route.use("/storage", storage());
  route.use("/gpu", gpu());
  route.use("/powerSupply", powerSupply());

  route.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  route.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/failed" }),
    function (req, res) {
      res.redirect("/success");
    }
  );
  route.get("/success", (req, res) => {
    res.json("success");
  });
  route.get("/failed", (req, res) => {
    res.json("failed");
  });

  app.use("/", route);
  return app;
};
