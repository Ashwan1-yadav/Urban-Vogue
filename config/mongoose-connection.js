const mongoose = require("mongoose")
const dbgr = require("debug")("development:mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/drip-bags").then(function(){
    dbgr("Database-connected")
}).catch(function(err){
    dbgr(err)
});


module.exports = mongoose.connection;