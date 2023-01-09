import config from "../config/config";
import { v4 as uuidv4 } from "uuid";
export default {
  async uploadImage(res: any, path: string, file: any) {
    return new Promise((resolve, reject) => {
      if (!["png", "jpg", "jpeg"].includes(file.mimetype.split("/")[1])) {
        return res.status(400).send("only png and jpg are allow");
      }
      if (file.size > 2 * 1000 * 1000) {
        return res.status(400).send("file size limit is 2Mb");
      }
      const fileName = uuidv4()
        .concat(".")
        .concat(file.originalname.split(".")[1]);
      const fileUpload = config.bucketStorage().file(`${path}/${fileName}`);
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
          firebaseStorageDownloadTokens: null,
        },
      });
      stream.on("error", (error: any) => {
        console.log(error);
        return res
          .status(400)
          .send("Something is wrong! Unable to upload at the moment.");
      });
      stream.on("finish", async () => {
        console.log("successful upload");
        const url = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${path}%2F${fileName}?alt=media`;
        resolve(url);
      });
      stream.end(file.buffer);
    });
  },
};
