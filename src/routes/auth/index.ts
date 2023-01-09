import { Router } from "express";
import authController from "./auth.controller";
import uploadImg from "../../util/picture.upload";
const upload = require("multer")();
export default () => {
  const router = Router();
  router.get("/test", authController.signUp);
  // router.post("/login");
  // router.post("/signup");
  router.post("/upload", upload.single("file"), async (req, res) => {
    var Image = req.file;
    console.log(Image);

    try {
      var productImg = await uploadImg.uploadImage(res, "image", Image);
      // console.log(productImg);
    } catch (error) {
      console.log(error);

      res.send(error);
    }
    return res.send(productImg);
  });
  return router;
};
