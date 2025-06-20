import userModel from "../../DB/models/users.model.js";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
//========================= NOTE: Signup New Users =============================
export const signup = async (req, res, next) => {
  try {
    const { name, email, password, phone, gender } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const encryptPhone = CryptoJS.AES.encrypt(phone, "sarahaPhoneEncrypt").toString();
    const user = await userModel.create({ name, email, password: hashedPassword, phone: encryptPhone, gender });
    return res.status(201).json({ msg: "User created successfully", user });
  } catch (error) {
    return res.status(500).json({ msg: "Error", message: error.message });
  }
};
//========================= NOTE: SignIn Users =================================
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User Not Found" });
    }
    const matchPassword = bcrypt.compareSync(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ msg: "Invalid Password" });
    }
    return res.status(201).json({ msg: "Done..", user });
  } catch (error) {
    return res.status(500).json({ msg: "Error SignIn", message: error.message });
  }
};
