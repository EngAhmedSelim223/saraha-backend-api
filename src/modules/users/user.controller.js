import { Router } from "express";
import { signup, signIn, getUserProfile } from "./user.service.js";
import { checkUserBeforeSignup } from "../../middlewares/checkUser.js";
import { authentication } from "../../middlewares/auth.js";
const userRouter = Router();
userRouter.get("/", authentication, getUserProfile);
userRouter.post("/signup", checkUserBeforeSignup, signup);
userRouter.post("/signin", signIn);
export default userRouter;
