const mongoose = require ("mongoose");
const userSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    

    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
        
    },
    password:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'USER',
        lowercase:true
    
    },
    user_name:{
        type:String,
        required:false

        
    },
},
    {
    
        timestamps:true,
        versionKey:false
    
    }
    
);
module.exports=mongoose.model("usermodel",userSchema);