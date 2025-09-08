import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function Cart() {
  const [cart, setCart] = useState([]);

  // Fetch cart items on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Fetch cart from backend
  async function fetchCart() {
    try {
      const res = await API.get('/cart');

      // Backend may return whole cart object OR just { items: [] }
      const items = res.data?.items || [];
      setCart(items);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCart([]);
    }
  }

  // Remove item
  async function remove(itemId) {
    try {
      await API.delete(`/cart/${itemId}`);
      fetchCart();
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Failed to remove item');
    }
  }

  // Update quantity
  async function setQty(itemId, qty) {
    try {
      if (qty < 1) return;
      await API.post('/cart/set', { itemId, quantity: Number(qty) });
      fetchCart();
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Failed to update quantity');
    }
  }

  // Calculate total price
  const total = cart.reduce(
    (sum, c) => sum + ((c.item?.price || 0) * c.quantity),
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      {!cart || cart.length === 0 ? (
        <p className="text-gray-600">Cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((c) => (
              <div
                key={c._id || c.item?._id}
                className="flex gap-6 items-center border p-4 rounded-lg shadow bg-white"
              >
                <img
                  src={c.item?.image || '/placeholder.png'}
                  alt={c.item?.title || 'Item'}
                  className="w-40 h-40 object-contain rounded-lg border"
                />

                <div className="flex-1">
                  <div className="font-semibold text-lg">
                    {c.item?.title || 'Untitled'}
                  </div>
                  <div className="text-gray-600">
                    ₹{c.item?.price || 0}
                  </div>
                </div>

                <input
                  type="number"
                  value={c.quantity}
                  min={1}
                  onChange={(e) => setQty(c.item?._id, e.target.value)}
                  className="border p-1 w-20 text-center rounded"
                />

                <button
                  onClick={() => remove(c.item?._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right text-xl font-semibold">
            Total: ₹{total}
          </div>
        </>
      )}
    </div>
  );
}
