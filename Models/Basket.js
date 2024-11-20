const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  currency: { 
    type: String, 
    enum: ["$", "€", "₼"], 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Basket', basketSchema);
