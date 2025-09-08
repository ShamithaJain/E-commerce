import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ user }) {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">My E-commerce</h1>
      <nav className="space-x-4">
        {user ? (
          <>
            <Link to="/items" className="hover:underline">Items</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
          </>
        ) : (
          <>
            <Link to="/signup" className="hover:underline">Signup</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
