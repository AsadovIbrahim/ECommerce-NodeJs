const express=require('express');
const Product=require('../Models/Product');
const {authMiddleware,adminMiddleware}=require('../Middleware/authMiddleware');

const router=express.Router();

router.post('/create',authMiddleware,adminMiddleware,async(req,res)=>{
    const product=new Product(req.body);
    await product.save();
    res.json(product);
});

router.get('/',async(req,res)=>{
    const {page=1,limit=10}=req.query;
    const products=await Product.find()
        .limit(limit*1)
        .skip((page-1)*limit)
        .exec();
    res.json(products);
})

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  });
  
  router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  });
  
  module.exports = router;