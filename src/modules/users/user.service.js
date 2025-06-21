import userModel from "../../DB/models/users.model.js";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
//========================= NOTE: Signup New Users =============================
export const signup = async (req, res, next) => {
  try {
    const encryptionKey = process.env.PHONE_ENCRYPTION_KEY;
    const saltRounds = process.env.SALT_ROUNDS;

    const { name, email, password, phone, gender } = req.body;
    const hashedPassword = bcrypt.hashSync(password, parseInt(saltRounds));
    const encryptPhone = CryptoJS.AES.encrypt(phone, encryptionKey).toString();
    const user = await userModel.create({ name, email, password: hashedPassword, phone: encryptPhone, gender });
    return res.status(201).json({ msg: "User created successfully", user });
  } catch (error) {
    return res.status(500).json({ msg: "Error", message: error.message });
  }
};
//========================= NOTE: SignIn Users =================================
export const signIn = async (req, res, next) => {
  try {
    const jwtUserSecretKey = process.env.JWT_SECRET_USER;
    const jwtAdminSecretKey = process.env.JWT_SECRET_ADMIN;

    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User Not Found" });
    }
    const matchPassword = bcrypt.compareSync(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      user.role == "admin" ? jwtAdminSecretKey : jwtUserSecretKey,
      { expiresIn: "1h" }
    );
    return res.status(201).json({ msg: "Done..", token });
  } catch (error) {
    return res.status(500).json({ msg: "Error SignIn", message: error.message });
  }
};
//========================= NOTE: Get User Profile =============================
export const getUserProfile = async (req, res, next) => {
  try {
    const encryptionKey = process.env.PHONE_ENCRYPTION_KEY;
    const user = await userModel.findById(req.userId);
    const phoneDecrypt = CryptoJS.AES.decrypt(user.phone, encryptionKey).toString(CryptoJS.enc.Utf8);
    user.phone = phoneDecrypt;
    return res.status(200).json({ msg: "Done", user });
  } catch (error) {
    return res.status(500).json({ msg: "Error Getting Profile", message: error.message });
  }
};
//============================
