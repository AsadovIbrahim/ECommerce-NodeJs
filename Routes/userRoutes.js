const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const { authMiddleware, adminMiddleware } = require('../Middleware/authMiddleware');

const router = express.Router();

router.get('/secret',authMiddleware,adminMiddleware,(req,res)=>{
  res.json({message:"Welcome Admin!"});
})

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password,role } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ firstName, lastName, email, passwordHash,role:role||'User' });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id,role:user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

router.delete('/delete', authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: "User deleted successfully..." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

module.exports = router;
