import config from "../config/config";
const jwt = require('jsonwebtoken')
function jwtGenerator(user:string){
    const accessToken = jwt.sign(user, config.JWT_SECRET, {expiresIn: '24h'});
    const refreshToken = jwt.sign(user, config.REFRESH_JWT_SECRET,{expiresIn: '7d'})
    return {accessToken: accessToken, refreshToken: refreshToken}
}
module.exports={
    jwtGenerator
}