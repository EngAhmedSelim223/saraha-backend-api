import userModel from "../../DB/models/users.model.js";
//========================= NOTE: Signup New Users =============================
export const signup = async (req, res, next) => {
  try {
    const { name, email, password, phone, gender } = req.body;
    const user = await userModel.create({ name, email, password, phone, gender });
    return res.status(201).json({ msg: "User created successfully", user });
  } catch (error) {
    return res.status(500).json({ msg: "Error", message: error.message });
  }
};
