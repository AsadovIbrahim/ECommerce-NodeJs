const express = require('express');
const Basket = require('../models/Basket');
const { authMiddleware } = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/addbasket', authMiddleware, async (req, res) => {
  try {
    const basket = new Basket({ ...req.body, user: req.user._id });
    await basket.save();
    res.status(201).json(basket);
  } catch (error) {
    res.status(500).json({ message: "Error creating basket", error: error.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const basket = await Basket.findOne({ user: req.user._id }).populate('products.productId');
    if (!basket) {
      return res.status(404).json({ message: "Basket not found" });
    }
    res.json(basket);
  } catch (error) {
    res.status(500).json({ message: "Error fetching basket", error: error.message });
  }
});


router.put('/:id', authMiddleware, async (req, res) => {
  const basket = await Basket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(basket);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await Basket.findByIdAndDelete(req.params.id);
  res.json({ message: "Basket deleted" });
});

module.exports = router;

