import bootstrap from "./src/app.controller.js";
import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("config/.env") });
const app = express();
const PORT = process.env.PORT;

bootstrap(app, express);

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
