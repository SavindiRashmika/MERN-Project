const mongoose = require("mongoose")

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("✅ MongoDB Connected Successfully");
    }catch(err){
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB
