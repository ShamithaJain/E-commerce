const express = require('express');
const Item = require('../models/Item');
const auth = require('../middleware/auth');
const router = express.Router();

// Create (admin-like)
router.post('/', auth, async (req, res) => {
  // For assignment: anyone logged in can create items; in production gate to admin.
  try {
    const item = new Item(req.body);
    await item.save();
    res.json(item);
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

// Read list with filters
// Query params: minPrice, maxPrice, category, q (search), page, limit, sort
router.get('/', async (req, res) => {
  try {
    const { minPrice, maxPrice, category, q, page = 1, limit = 50, sort } = req.query;
    const filter = {};
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
    if (category) filter.category = category;
    if (q) filter.title = { $regex: q, $options: 'i' };

    const skip = (page - 1) * limit;
    let query = Item.find(filter).skip(skip).limit(Number(limit));
    if (sort) query = query.sort(sort);
    const items = await query.exec();
    const total = await Item.countDocuments(filter);
    res.json({ items, total });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

// Read single
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Not found' });
    res.json(item);
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

module.exports = router;
