import userModel from "../DB/models/users.model.js";
export const checkUserBeforeSignup = async (req, res, next) => {
  try {
    const { email, phone, password, cPassword } = req.body;
    if (password !== cPassword) {
      return res.status(400).json({ msg: "Password don't match" });
    }
    const existingUser = await userModel.findOne({
      $or: [{ email: email?.toLowerCase().trim() }, { phone: phone?.trim() }],
    });

    if (existingUser) {
      const conflictField = existingUser.email === email?.toLowerCase().trim() ? "email" : "phone";
      const conflictMessage =
        conflictField === "email" ? "Email is already registered" : "Phone number is already registered";

      return res.status(409).json({
        success: false,
        message: conflictMessage,
        field: conflictField,
      });
    }

    // If no conflicts, proceed to next middleware
    next();
  } catch (error) {
    console.error("Check user middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while checking user data",
    });
  }
};
