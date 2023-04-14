const mongoose = require ("mongoose");
const addressSchema = new mongoose.Schema({
    accessToken:{
    type:String
    },

    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    
    state:{
        type:String,
        required:true
    },
    
    zipcode:{
        type:String,
        required:true
    },
    user_Id:{
        type:String,
        required:false
    }
});
module.exports =mongoose.model("address", addressSchema);