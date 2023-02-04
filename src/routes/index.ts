import { Application, Router } from "express";
import auth from "./auth";
import brand from "./brand/index";
import category from "./category/index";
import cases from "./case/index";
import ram from "./ram/index";
import motherBoard from "./motherBoard/index";
import cpu from "./cpu/index";
import storage from "./storage/index";
import gpu from "./gpu/index";
import powerSupply from "./powerSupply/index";
import passport from "passport";
import "../config/google/google.config";
import "../config/facebook/facebook.config";
import Session from "express-session";
import { authMiddleware } from "../middleware/auth";
import { authorizeUser } from "../middleware/authorize";
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
  route.use("/brand", authMiddleware, brand());
  route.use("/category", authMiddleware, category());
  route.use("/case", authMiddleware, cases());
  route.use("/ram", authMiddleware, ram());
  route.use("/motherBoard", authMiddleware, motherBoard());
  route.use("/cpu", authMiddleware, cpu());
  route.use("/storage", authMiddleware, authorizeUser("ADMIN"), storage());
  route.use("/gpu", authMiddleware, gpu());
  route.use("/powerSupply", authMiddleware, powerSupply());

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

  route.get("/facebook", passport.authenticate("facebook"));

  route.get(
    "/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/failed" }),
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

  route.get("/logout", (req, res) => {
    req.session.destroy(function (err) {
      res.clearCookie("connect.sid");
      res.send("you logged out");
    });
  });

  app.use("/", route);
  return app;
};
