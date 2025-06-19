import connectionDB from "./DB/connectionDB.js";
const bootstrap = (app, express) => {
  connectionDB();
  app.use(express.json());

  app.use((req, res, next) => {
    return res.status(404).json({ msg: "Page Not Found" });
  });
};

export default bootstrap;
