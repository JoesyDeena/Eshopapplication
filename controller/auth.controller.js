const emailValidator = require("deep-email-validator");
const jwt =require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userDetails = require ("../models/usermodel");
const userAddress = require ("../models/address");
const productDetails =require ("../models/product");
const orderDetails = require ("../models/order");
const secretConfig = require ("../config/auth.config");
exports.addNew =async (req,res)=>{
    if(!req.body||Object.keys(req.body)===0){
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }
    
try{
    const {email , phone_number} = req.body;
    const phoneRegex = /^[0-9]{10}$/;
    
    if(!validator.isEmail(email)){
        return res.status(400).send({
           message: "Invalid email-id format!"
        });
   }
   
    
    if(!phoneRegex.test(phone_number)){
       return res.status(400).send({
            message:"Invalid contact number!"
        });
    }
    const existingUser = await userDetails.findOne({email});
    if(existingUser){
       return res.status(409).send({
            message:"Try any other email, this email is already registered!"
        })
    }
    const newUser = await userDetails.create({
    password:bcrypt.hashSync(req.body.password,8),
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    phone_number:req.body.phone_number,
    role:req.body.role

});
    res.status(200).json({
        status:"success",
        _id:newUser._id,
        first_name:newUser.first_name,
        last_name:newUser.last_name,
        email:newUser.email


    });
    
    
    
     }
     catch(err){
        console.log("Error creating user",err);
        res.status(500).send({
            message:"Some error occurred while creating user"
        
        });
     }

    }
    //singnIn
    exports.signIn = async(req,res) => {
        
        const {email ,password} = req.body;
        if(!email && !password){
            return res.status(400).send({
                message:"Please enter your mailId and password"
                
            });
        }
        try{
        const signInUser = await userDetails.findOne({email});
        if(!signInUser){
        return res.status(400).send({
            message:"This email has not been registered"
        });

    }
      if((!bcrypt.compareSync(req.body.password,signInUser.password))){
        return res.status(400).send({
            message:"Invalid Credentials!"
        });
      }

//x-auth create token and send to user
 var token = jwt.sign({id:signInUser._id ,someData:"important"} ,secretConfig.secret,{expiresIn:500});

   res.header("x-auth-token",token).status(200).send({
    message:"Successfully signed in your account",
    user:{
        email:signInUser.email,
        password:signInUser.password,
        isAuthenticated:true,
        accessToken:token

    }
});
    }

catch(err){
    console.log("Error creating user",err);
        res.status(500).send({
            message:"Some error occurred while signIn"
        
        });
     }


}

   