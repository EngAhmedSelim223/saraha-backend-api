import connectionDB from "./DB/connectionDB.js";
import userRouter from "./modules/users/user.controller.js";
const bootstrap = (app, express) => {
  connectionDB();
  app.use(express.json());
  app.use("/users", userRouter);

  app.use((req, res, next) => {
    return res.status(404).json({ msg: "Page Not Found" });
  });
};

export default bootstrap;
