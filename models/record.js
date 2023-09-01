const mongoose = require("mongoose");

/* record SCHEMA */
const recordSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required : true
    },
    status:{
        type : String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
},{
    timestamps:true
})

const Record = mongoose.model('Record',recordSchema);

module.exports = Record;