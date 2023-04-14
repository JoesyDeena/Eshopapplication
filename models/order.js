const mongoose = require ("mongoose");
const orderSchema = new mongoose.Schema({
    accessToken:{
        type:String
        
    },
    quantity:{
    type:Number,
    required:true
    },

    amount:{
        type:Number,
        required:false
    },
    order_date:{
        type:Date,
        immutable:true,
        default: () => {
            return Date.now();
        }
    },
    product_id:{
        type:String,
        required:true
    },
    address_id:{
        type:String,
        required:true
    }
    
});
module.exports = mongoose.model("order",orderSchema);