import config from "../config/config";
const jwt = require("jsonwebtoken");
function jwtGenerator(userId: string) {
  const accessToken = jwt.sign(userId, config.JWT_SECRET, { expiresIn: "24h" });
  const refreshToken = jwt.sign(userId, config.REFRESH_JWT_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken: accessToken, refreshToken: refreshToken };
}
function getUserIdByToken(tok: string) {
  const [, token] = tok.split(" ");
  var decoded = jwt.verify(token, config.JWT_SECRET);
  return decoded;
}
export default {
  jwtGenerator,
  getUserIdByToken,
};
