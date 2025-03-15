const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email?.trim()) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email", success: false, error: true });
    }
    if (!password?.trim()) {
      return res
        .status(400)
        .json({ message: "Please provide a valid password", success: false, error: true });
    }

    // Check if user exists in the database
    const user = await userModel.findOne({ email: email.trim() });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false, error: true });
    }

    // Compare passwords
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(401)
        .json({ message: "Invalid password", success: false, error: true });
    }

    // Create JWT token
    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

      const tokenOption = {
        httpOnly: true,
        secure: true,
      };

      res
        .cookie("token", token, tokenOption)
        .status(200)
        .json({
          message: "Login successfully",
          data: token,
          success: true,
          error: false,
        });
    } else {
      throw new Error("Please check Password");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
