const mongoose = require('mongoose');

/* USER SCHEMA */
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true 
    },
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
    ,
    records:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Record'
        }
    ]
},{
    timestamps:true
})


const User = mongoose.model("User",userSchema);

module.exports = User;