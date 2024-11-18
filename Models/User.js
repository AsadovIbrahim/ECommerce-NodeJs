const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, 
  basket: { type: mongoose.Schema.Types.ObjectId, ref: "Basket", default: null },
  role:{type:String,enum:['Admin','User'],default:'User'}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
