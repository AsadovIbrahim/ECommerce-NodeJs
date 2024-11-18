const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number},
    currency:{type:String,enum:["$", "€", "₼"],required:true},
    category:{type:String,enum:["tech","fashion","cars"],required:true},
    stock:{type:Number,required:true},
    gallery:{type:[String],default:[]}
},{timestamps:true})

module.exports=mongoose.model('Product',productSchema);