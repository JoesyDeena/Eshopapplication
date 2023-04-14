const mongoose = require ("mongoose");
const productSchema = new mongoose.Schema({
    product_id:{
        type:Number,
        required:false
    },
    available_items:{
        type:Number,
        required:false
    },
    category:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        immutable:true,
        default: () => {
            return Date.now();
        }
    },
    description:{
        type:String,
        required:false

    },
    image_url:{
        type:String,
        required:true
    },
    manufacturer:{
        type:String,
        required:false
    },

    product_name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        default:0.0
    },
    available_items:{
        type:Number,
        required:true
    },
    updated:{
        type:Date,
        default:() => {
            return Date.now();
        }
    },
    direction:{
        type:String,
        required:false

    },
    sortby:{
        type:String,
        required:true
    }

});
module.exports = mongoose.model("product",productSchema);