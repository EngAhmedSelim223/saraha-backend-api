import { Router } from "express";
import { signup, signIn } from "./user.service.js";
import { checkUserBeforeSignup } from "../../middlewares/checkUser.js";

const userRouter = Router();
userRouter.post("/signup", checkUserBeforeSignup, signup);
userRouter.post("/signin", signIn);
export default userRouter;
