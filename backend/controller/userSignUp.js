const userModel = require('../models/userModel'); 
const bcrypt = require('bcryptjs');


async function userSignUpController(req,res){
    try{
        const { email, password, name} = req.body

        const user = await userModel.findOne({email})

        if (user) {
            return res.status(400).json({
                message: "User already exists.",
                success: false,
                error: true,
            });
        }
        

        if(!email){
           throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);


        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        const payload = {
            name,
            email,
            role: "GENERAL",
            password: hashPassword,
        };
        

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!",
        });        


    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }    
}

module.exports = userSignUpController