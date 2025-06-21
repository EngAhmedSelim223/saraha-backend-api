import jwt from "jsonwebtoken";
import userModel from "../DB/models/users.model.js";
export const authentication = async (req, res, next) => {
  try {
    const jwtSecretKey = process.env.JWT_SECRET;
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(400).json({ msg: "unauthorized user" });
    }
    const decodedToken = jwt.verify(authorization, jwtSecretKey);
    if (!decodedToken?.id) {
      return res.status(400).json({ msg: "Invalid Token" });
    }
    const user = await userModel.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
