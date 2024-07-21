const {User}=require("../models.js");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const signup=async (req,res)=>{
    try{
        const {username,email,password,confirmPassword}=req.body;

        if(password!=confirmPassword){
            return res.status(400).json({error:"Passwords dont match"})
        }

        const user=await User.findOne({email});
        

        if(user){
            return res.status(400).json({error:"Username already exists"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(password,salt);
     

        const newUser=new User({
            username,
            email,
            password:hashedPass,
        })

        if(newUser){
            const id=newUser._id;
            const token=jwt.sign({id},process.env.JWT_SECRET)
            
            await res.cookie("token",token,{
                maxAge: 15 * 24 * 60 * 60 * 1000,
        })
        }

        await newUser.save();

        res.status(201).json({
            userId:newUser._id,
            username:newUser.username,
        })
    

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})

    }
};


const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(email,password);
        
        const result=await User.findOne({
            email
        })
        console.log(result);
        const passwordCheck=await bcrypt.compare(password,result?.password || "")
        console.log(passwordCheck);
        if(!result || !passwordCheck){
            return res.status(400).json({
                error:"Invalid email or password"
            })
        }

        
        const id=result._id;

        
        const token=jwt.sign({id},process.env.JWT_SECRET);
        console.log(token);
        await res.cookie("token",token,{
            maxAge: 15 * 24 * 60 * 60 * 1000,

    })

    res.status(201).json({
        userId:result._id,
        username:result.username,
        token:token
    })
           
        
    } catch(err){
        console.log(err);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
};

const logout=(req,res)=>{
    try{
        res.cookie("token","",{ maxAge:0 });
        res.status(200).json({ msg:"Logged out successfully"})

    } catch(err){
        console.log(err);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
   
};

module.exports={
    login,
    signup,
    logout
}
