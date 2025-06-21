import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("config/.env") });
import bootstrap from "./src/app.controller.js";
import express from "express";
const app = express();
const PORT = process.env.PORT;

bootstrap(app, express);

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
