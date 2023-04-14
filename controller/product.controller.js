const jwt = require("jsonwebtoken");
const bcrypt = require ("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");
const userDetails = require ("../models/usermodel");
const userAddress = require ("../models/address");
const productDetails =require ("../models/product");
const queryString = require("querystring");

exports.saveProduct = async (req,res) => {
    if(!req.body||Object.keys(req.body)===0){
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }
    
try{

    const now = new Date();
    const addProduct = await productDetails.create({
        product_name : req.body.product_name,
        description : req.body.description,
        available_items : req.body.available_items,
        category:req.body.category,
        manufacturer: req.body.manufacturer,
        price: req.body.price,
        image_url: req.body.image_url,
        created: now.toISOString(),
        updated:now. toISOString()

    });
    res.status(200).send({
    product_name : addProduct.product_name,
    description : addProduct.description,
    available_items : addProduct.available_items,
    category:addProduct.category,
    manufacturer: addProduct.manufacturer,
    price: addProduct.price,
    image_url: addProduct.image_url,
    created: addProduct.created,
    updated: addProduct.updated
    });
}catch(err){
    console.log("Error creating product",err);
    res.status(500).send({
        message:"Some error occurred while creating product"
    
    });
 }

}
//search product

exports.searchProduct = async(req,res) => {

    try{
        
        const queryobj = {...req.query};
        const excludefields = ["sortby","direction"];
        excludefields.forEach((element) => delete queryobj[element]);

        let query = productDetails.find(queryobj);

        if(req.query.sortby){
            if(req.query.direction === 'ASC'){
                query = query.sort(req.query.sortby);
            }
            else if(req.query.direction === 'DESC'){
                query = query.sort("-" + req.query.sortby);
            }
        }
           
        const products = await query;

         res.status(200).send({
            message: "Success",
            products
         });
    }

    catch(err){
        console.log("Error searching on product", err);
        res.status(500).send({
            message: "Some error occured while searching the Product"
        });
    }
}
//list products category
exports.productCategory = async(req,res)=>{
    try{
        const listCategory = await productDetails.distinct('category');
        if(listCategory.length===0){
            return res.status(404).send({
                message:"No categories found!"
            });
        }
        return res.status(200).send({
           listCategory, message:"All categories listed successfully."
        });
    }
    catch(err){
        console.log("error catching category",err);
        res.status(500).send({
            message: "Some error occurred while fetching Categories."
        });

    }
    }
    //categories get by id

exports.getByid = async(req,res)=>{
    try{
    const details = await productDetails.findById(req.query.id);
    if(!details||details.length===0){
        return res.status(404).send({
            message:`No product found with given ID - ${req.query.id}`
        });
    }
    return res.status(200).send({
        message:`Successfully get details by ID -${req.query.id}` ,
         details
    });
    }
    catch(err){
        console.log("Error fetching product details with ID",err);
        res.status(500).send({
            message :"Some error occured while fetching the product with the given ID"
        });
    }
}
//update product details
exports.updateDetails = async (req,res)=>{
    const {id} = req.query;
    const updates = {product_name:req.body.product_name,
    description : req.body.description,
    available_items : req.body.available_items,
    category:req.body.category,
    manufacturer: req.body.manufacturer,
    price: req.body.price,
    image_url: req.body.image_url
    };
    try{
    if(!updates){
        return res.status(400).send({
          message : "Product details required!"
        });
    }
    const updateId = await productDetails.findByIdAndUpdate(id,updates);
    if(!updateId){
        return res.status(200).send({
             message:"No product found for given ID"
         });
     }
         return res.status(200).send({updateId,
             message :"Product updated successfully."
         });
     
 } catch(err){
     console.log("Error update product details with rating",err);
     res.status(500).send({
         message:"Some error occured while update the product."
     });
 }
}
//delete product
exports.DeleteProducts=async (req,res)=>{
    try{
        const id=req.query.id;

       
        const DeleteProduct=await productDetails.findByIdAndDelete(id);

        if(!DeleteProduct||DeleteProduct.length===0){
           return  res.status(400).send({
                message:'no product found for given id'
            })
        }
           res.status(200).send({
             status:'success',
             data:{
                DeleteProduct,
             }
           })
    }
    catch(err){
        console.log("Error update product delete with rating",err);
     res.status(500).send({
         message:"Some error occured while delete the product."
     });
 }
}