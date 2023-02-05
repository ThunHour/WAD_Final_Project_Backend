import config from "../config/config";
const jwt = require("jsonwebtoken");
function jwtGenerator(user: any) {
  const accessToken = jwt.sign(
    { email: user.email, password: user.password, id: user.id },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: "24h", algorithm: "HS256" }
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

function verifyRefreshToken(refreshToken: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      config.REFRESH_TOKEN_SECRET,
      (err: any, user: any) => {
        if (err) return reject();
        const email = user.email;
        const password = user.password;
        const id = user.id;
        const userInfo = { email: email, password: password, id: id };
        console.log(userInfo);

        resolve(userInfo);
      }
    );
  });
}

export default {
  jwtGenerator,
  verifyRefreshToken,
};
