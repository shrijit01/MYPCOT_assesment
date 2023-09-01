const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mypcot_Records");

const db = mongoose.connection;


db.on('error',function(err){
    console.log(err,"error while DB connection");
});

db.once('open',function(){
    console.log('Successfully Connected to the DB ');
})

module.exports = db;