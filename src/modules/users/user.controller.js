import { Router } from "express";
import { signup } from "./user.service.js";
import { checkUserBeforeSignup } from "../../middlewares/checkUser.js";

const userRouter = Router();
userRouter.post("/signup", checkUserBeforeSignup, signup);
export default userRouter;
