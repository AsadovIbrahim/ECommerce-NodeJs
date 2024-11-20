const mongoose=require("mongoose");

const connectDb=()=>{
    try{
        mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected DB");
    }
    catch(error){
        console.log("Failed to connect database...",error);
    }
}

module.exports.connectDb=connectDb;