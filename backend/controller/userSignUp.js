const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({
                message: "Please provide all required fields.",
                success: false,
                error: true,
            });
        }

        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists.",
                success: false,
                error: true,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const payload = {
            name,
            email,
            role: "GENERAL",
            password: hashPassword,
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            message: "User created successfully!",
        });
    } catch (err) {
        console.log(err);  // Log error for better debugging
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
