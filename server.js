const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimiter = require('./Middleware/rateLimiter');
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const basketRoutes = require('./Routes/basketRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/basket', basketRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)))
  .catch(err => console.log(err));
