const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  quantity: { type: Number, default: 1 }
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  cart: [CartItemSchema] // persistent cart tied to user
});

module.exports = mongoose.model('User', UserSchema);
