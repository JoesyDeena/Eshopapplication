const jwt = require ("jsonwebtoken");
const userDetails = require ("../models/usermodel");
const userAddress = require ("../models/address");
const productDetails =require ("../models/product");
const orderDetails = require ("../models/order");
//create order
exports.createOrder= async(req,res) => {
    try{
        const {product_id,address_id} =req.body;
        let token =req.headers["x-auth-token"];
        const decodedToken = jwt.decode(token ,{complete: true});
       const userid = decodedToken.payload.id ;
    
    //userid verification
    const userInfo = await userDetails.findOne({_id:userid});
    if(!userInfo){
        return res.status(404).send({
            message:"user not found"
        });
    }
    //productid verification
    const productInfo = await productDetails.findOne({_id:product_id});
    if(!productInfo){
        return res.status(404).send({
            message:`product not found for id- ${product_id}`
        });
    }
    if(productInfo.available_items<=0){
        return res.status(400).send({
            message:`Product with ID - ${product_id} is currently out of stock!`
        })
    }

    // AddressId verification
    const addressInfo = await userAddress.findOne({ _id: address_id });
    if (!addressInfo) {
        return res.status(404).send({
            message: `No Address found for ID - ${address_id}!`
        });
    }

    //After getting the productId create an order
    const orderCreation = await orderDetails.create({
        product_id: productInfo._id,
        address_id: addressInfo._id,
        quantity: req.body.quantity
    });
    res.status(200).send({
        id: orderCreation._id,
        user: { userInfo },
        product: { productInfo },
        address: { addressInfo },
        amount: productInfo.price,
        orderDate: new Date(Date.now())
    });
}
catch (err) {
    console.log("Error is occuring", err);
    res.status(500).send({
        message: "Some error occured while creating an order"
    });
}
}