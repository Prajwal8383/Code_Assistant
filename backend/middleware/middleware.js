const jwt=require("jsonwebtoken");
const {User}=require("../models.js");


const authMiddleware=async (req,res,next)=>{

    const authHeader = req.headers.authorization || '';

    var token;
     if (authHeader.startsWith('Bearer ')) {
        token= authHeader.substring(7); 
    }


    try {
        console.log(token);
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        if(!decoded){
            return res.status(500).json({error:"Unauthorised"});

        }

        const user=await User.findById(decoded.id).select("password");

        if(!user){
            return res.status(500).json({error:"No user found"});
        }
        
        req.user=user;
        next();
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:"Internal server error"});
        
    }
}

module.exports={
    authMiddleware
}