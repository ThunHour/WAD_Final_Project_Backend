import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken'
import config from '../config/config'
export default async (req: any, res: Response, next:NextFunction) => {
  // get token from bearer header
  if (!req.headers.authorization) {
    return res.status(401).send({message: 'No token provided'})
  }
  // split bearer token into two parts
  const [, token] = req.headers.authorization.split(' ')

  if (!token) {
    return res.status(401).send({error: 'No token provided'})
  }
  try {
    const decoded = await verify(token, config.JWT_SECRET!)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).send({error: 'Invalid token or expired'})
  }
}
