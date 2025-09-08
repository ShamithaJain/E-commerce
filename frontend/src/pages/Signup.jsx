import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Signup({ setUser }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  // Clear form on mount to ensure no previous values show
  useEffect(() => {
    setForm({ name: '', email: '', password: '' });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', form);
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      navigate('/items');
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md mx-auto p-6 bg-white rounded shadow"
      autoComplete="off" // disable browser auto-fill
    >
      <h2 className="text-2xl mb-4">Signup</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="border p-2 mb-3 w-full rounded"
        autoComplete="off"
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="border p-2 mb-3 w-full rounded"
        autoComplete="off"
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        className="border p-2 mb-3 w-full rounded"
        autoComplete="new-password"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Signup
      </button>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
