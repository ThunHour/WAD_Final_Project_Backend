import express from "express";
import loaders from "./loaders";
import config from "./config/config";
function app() {
  const app = express();
  loaders(app);
  const port = config.PORT || 4000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.listen(port, () => console.log(`Server is listening on port ${port}!`));
}
app();
