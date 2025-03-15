const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password", error: true, success: false });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", error: true, success: false });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        console.log("checkPassword:", checkPassword);

        if (!checkPassword) {
            return res.status(401).json({ message: "Incorrect password", error: true, success: false });
        }

        // Generate token
        const tokenData = { _id: user._id, email: user.email };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "8h" });

        // Set cookie options
        const tokenOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Allow in production only
            sameSite: "strict"
        };

        // Send token as cookie and response
        res.cookie("token", token, tokenOption).status(200).json({
            message: "Login successful",
            success: true,
            error: false,
            token
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "Server Error",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
