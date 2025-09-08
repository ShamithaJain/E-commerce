import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ItemsList from './pages/ItemsList';
import Cart from './pages/Cart';
import Header from './components/Header';

export default function App() {
  const [user, setUser] = React.useState(null); // simple auth state

  return (
    <Router>
      <Header user={user} />
      <div className="p-4 max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/items" element={user ? <ItemsList /> : <Navigate to="/login" />} />
          <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}
