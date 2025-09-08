const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const Item = require('../models/Item');

// ------------------- UTILITY: CLEAN GHOST ITEMS -------------------
async function cleanCart(cart) {
  if (!cart) return null;

  // Keep only valid items
  cart.items = cart.items.filter(i => i.item !== null && i.item._id);
  await cart.save();

  return await cart.populate('items.item');
}

// ------------------- GET CART -------------------
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.item');
    cart = await cleanCart(cart);
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ------------------- ADD / UPDATE ITEM -------------------
router.post('/', auth, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    // Validate product exists
    const product = await Item.findById(itemId);
    if (!product) return res.status(400).json({ msg: 'Item does not exist' });

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) return res.status(400).json({ msg: "Invalid quantity" });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });

    // Use ObjectId equals to compare
    const existing = cart.items.find(i => i.item && i.item.equals(itemId));

    if (existing) {
      existing.quantity += qty; // increment quantity
    } else {
      cart.items.push({ item: itemId, quantity: qty });
    }

    await cart.save();

    // Populate before sending
    cart = await Cart.findById(cart._id).populate('items.item');

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

// ------------------- REMOVE ITEM -------------------
router.delete('/:itemId', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.item');
    if (!cart) return res.status(404).json({ msg: 'Cart not found' });

    // Remove the item and any ghost items
    cart.items = cart.items.filter(i => i.item && i.item._id.toString() !== req.params.itemId);

    await cart.save();
    cart = await cleanCart(cart);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
