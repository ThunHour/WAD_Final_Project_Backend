import config from "../config/config";
const jwt = require("jsonwebtoken");
function jwtGenerator(user: any) {
  const accessToken = jwt.sign(
    { email: user.email, password: user.password, id: user.id },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: "24h" }
  );
  const refreshToken = jwt.sign(
    { email: user.email, password: user.password, id: user.id },
    config.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return { accessToken: accessToken, refreshToken: refreshToken };
}

export default {
  jwtGenerator,
};
