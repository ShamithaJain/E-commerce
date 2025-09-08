const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const cartRoutes = require('./routes/cart');

const app = express();
app.use(cors({
  origin: 'https://ecomassign.netlify.app', // your Netlify frontend URL
  credentials: true,                        // if you use cookies
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/cart', cartRoutes);

// 👇 Add this so / doesn’t 404
app.get('/', (req, res) => {
  res.send('E-commerce API is running 🚀');
});

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch(err => console.error(err));
