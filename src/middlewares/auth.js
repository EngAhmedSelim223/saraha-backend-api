import jwt from "jsonwebtoken";
import userModel from "../DB/models/users.model.js";
export const authentication = async (req, res, next) => {
  try {
    const jwtUserSecretKey = process.env.JWT_SECRET_USER;
    const jwtAdminSecretKey = process.env.JWT_SECRET_ADMIN;
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(400).json({ msg: "unauthorized user" });
    }
    const [prefix, token] = authorization.split(" ");
    const SIGNATURE_TOKEN = prefix == "admin" ? jwtAdminSecretKey : jwtUserSecretKey;
    const decodedToken = jwt.verify(token, SIGNATURE_TOKEN);
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
