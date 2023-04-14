const jwt =require("jsonwebtoken");
const userDetails = require ("../models/usermodel");
const secretConfig = require ("../config/auth.config");

exports.verifyToken = (req,res,next) => {
    let token =req.headers["x-auth-token"];
    if(!token){
        return res.status(401).send({
            message:"Please login first to access the endpoint!"
        });
    }
    console.log("This is from middleware");
    jwt.verify(token,secretConfig.secret,(err) => {
     if (err){
       return res.status(401).send({
        message:"unautherised"
       });
     }
     next();
     });
    }
     exports.checkAdmin = (req,res,next)=>{
        let token = req.headers["x-auth-token"];
        if(!token){
            return res.status(401).send({
            message:"Please login first to access the endpoint"
            });
        }
       jwt.verify(token,secretConfig.secret,(err)=>{
        if(err){
            return res.status(401).send({
                message:"unautherized"
            });
        }
        
       });
       const decodedToken = jwt.decode(token ,{complete: true});
       const userid = decodedToken.payload.id ;
       userDetails.findOne({_id:userid})
          .then((usermodel) => {
            if(!usermodel){
                throw new Error("user not found");
            }
            const userReqType = usermodel.role ;
            if(userReqType!=="admin"){
             return res.status(401).send({
                message:"You are not autherised to access this endpoint"
             });
            }else{
               next();
            }
                
          })
          .catch((err)=>{
            console.error(err);
            res.status(500).send({
                message:"An error occcured while processing your request"
            });
          })
       

     }

