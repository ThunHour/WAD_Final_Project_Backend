import { NextFunction, Request, Response } from "express";

async function signUp(req: Request, res: Response, next: NextFunction) {
    return res.send("hello kon papa");
}
export default {
    signUp
}