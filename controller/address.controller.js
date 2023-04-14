const jwt = require("jsonwebtoken");
const bcrypt = require ("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");
const userDetails = require ("../models/usermodel");
const userAddress = require ("../models/address");
const productDetails =require ("../models/product");
const orderDetails = require ("../models/order");
const { addNew } = require("./auth.controller");
//const usermodel = require("../models/usermodel");
exports.addAddress =async (req,res)=> {
    if(!req.body||Object.keys(req.body)===0){
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }
    try{
       
    let token = req.headers["x-auth-token"];
    if(!token){
     res.status(400).send({
        message:"Please login first to access this endpoint!"
     });
    }
    const zipRegex = /^[0-9]{6}$/;
    if(!zipRegex.test(req.body.zipcode)){
        res.status(400).send({
            message:"Invalid zip code!"
        });

    }
    
   
    const phoneRegex = /^[0-9]{10}$/;
    if(!phoneRegex.test(req.body.phone)){
        res.staus(400).send({
            message:"Invalid phone_number!"
        });
    }
    // create address for the loggedin user
const now=new Date();
//decode the token for the relational purpose
const decodedToken = jwt.decode(token ,{complete:true});
const userid = decodedToken.payload.id;
const obj={};
userDetails.findOne({_id:userid})
    .then((usermodel)=>{
        if(!usermodel){
            throw new Error("user not found");
        }
obj.usermodel= usermodel;

    })
    .catch((err)=>{
console.log(err);
    });
const newAddress = await userAddress.create({
     name:req.body.name, 
     phone:req.body.phone,
     street:req.body.street,
     landmark:req.body.landmark,
     city:req.body.city,
     state:req.body.state,
     zipcode:req.body.zipcode,
     createdAt:now.toISOString(),
     updatedAt:now.toISOString()

    });
    res.status(200).send({
     address:{   
     _id:newAddress._id,
     name:newAddress.name, 
     phone_number:newAddress.phone_number,
     street:newAddress.street,
     landmark:newAddress.landmark,
     city:newAddress.city,
     state:newAddress.state,
     zipcode:newAddress.zipcode,
     createdAt:now.toISOString(),
     updatedAt:now.toISOString(),
     usermodel:obj.usermodel
     },

    });
}
    catch(err){
        console.log("Error creating userAddress",err);
        res.status(500).send({
            message:"Some error occurred while creating userAddress"
        
        });
     }

    }

