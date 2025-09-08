import React, { useEffect, useState } from "react";
import API from "../services/api";
import Notification from "../components/Notification";

export default function ItemsList() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ category: "", minPrice: "", maxPrice: "" });
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const q = new URLSearchParams();
      if (filters.minPrice) q.set("minPrice", filters.minPrice);
      if (filters.maxPrice) q.set("maxPrice", filters.maxPrice);
      if (filters.category) q.set("category", filters.category);

      const res = await API.get(`/items?${q.toString()}`);
      if (Array.isArray(res.data.items)) {
        setItems(res.data.items);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error(err);
      setItems([]);
      setNotification("Failed to fetch items");
    }
  }

  async function addToCart(itemId) {
    try {
      const token = localStorage.getItem("token") || "";
      await API.post("/cart", { itemId, quantity: 1 }, { headers: { Authorization: token } });
      setNotification("Item added to cart!");
    } catch (err) {
      console.error(err);
      setNotification(err?.response?.data?.msg || "Failed to add to cart");
    }
  }

  return (
    <div className="p-4">
      <Notification message={notification} onClose={() => setNotification("")} />

      {/* Filters */}
      <div className="mb-4 flex gap-2">
        <input
          placeholder="Min price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          className="border p-1 rounded"
        />
        <input
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          className="border p-1 rounded"
        />
        <input
          placeholder="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border p-1 rounded"
        />
        <button onClick={fetchItems} className="px-3 py-1 bg-blue-600 text-white rounded">
          Apply
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((it) =>
            it && it._id ? (
              <div key={it._id} className="border p-3 rounded shadow-sm bg-white">
                <img
                  src={it.image || "/placeholder.png"}
                  alt={it.title}
                  className="h-80 object-cover w-full mb-2 rounded-lg shadow"
                />
                <h3 className="font-semibold">{it.title}</h3>
                <p className="text-sm text-gray-600">{it.category}</p>
                <div className="flex justify-between items-center mt-2">
                  <strong>₹{it.price}</strong>
                  <button
                    onClick={() => addToCart(it._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : null
          )
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
}
