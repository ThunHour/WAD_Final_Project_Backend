import { Router } from "express";
import authController from "./auth.controller";
import img from "../../util/picture.upload";

const upload = require("multer")();
export default () => {
  const router = Router();
  router.get("/test", authController.signUp);
  // router.post("/login");
  // router.post("/signup");
  router.post("/upload", upload.array("file", 12), async (req, res) => {
    var image = req.files;
    var amount = req.files?.length;

    try {
      var productImg = await img.uploadMulti(res, image, Number(amount));
      console.log(productImg);
    } catch (error) {
      console.log(error);

      res.send(error);
    }
    return res.send("productImg");
  });
  return router;
};
