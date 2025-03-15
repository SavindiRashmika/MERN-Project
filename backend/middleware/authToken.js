const jwt = require('jsonwebtoken')

async function authToken(req,res,next) {
    try{
        const token = req.cookies?.token

        console.log("token",token)
        if(!token){
            return res.status(401).json({
                message : "Please Login...!",
                error : true,
                success : false
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            console.log(err)
            console.log("decoded",decoded)
            
            if(err){
                console.log("JWT Verification Error", err)
            }

            req.userId = decoded?._id
            next()
        });

    }catch(error){
        res.Status(400).json({
            message : error.message || error,
            data : [],
            error : true,
            success : false
        })
    }
}

module.exports = authToken;