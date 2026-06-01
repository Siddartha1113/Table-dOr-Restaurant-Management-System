import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AlertCircle, Building2, Lock, Mail, Utensils, Eye, EyeOff, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import axios from 'axios';

const demoUsers = [
  {
    _id: 'demo-customer-id',
    name: 'Demo Customer',
    email: 'demo@gmail.com',
    password: 'demo123',
    role: 'customer' as const,
    phone: '9999999999',
    restaurant: null,
  },
  {
    _id: 'demo-owner-id',
    name: 'Demo Owner',
    email: 'owner@gmail.com',
    password: 'owner123',
    role: 'owner' as const,
    phone: '8888888888',
    restaurant: null,
  },
  {
    _id: 'demo-admin-id',
    name: 'Demo Admin',
    email: 'admin@gmail.com',
    password: 'admin',
    role: 'admin' as const,
    phone: '1111111111',
    restaurant: null,
  },
];

export function Login() {
  const [role, setRole] = useState<'customer' | 'owner' | 'admin'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginWithDemoAccount = () => {
    const matchedUser = demoUsers.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() && user.password === password
    );

    if (!matchedUser) {
      setError('Invalid credentials or server error.');
      return false;
    }

    const { password: _password, ...user } = matchedUser;
    localStorage.setItem('token', `demo-token-${user.role}`);
    localStorage.setItem('user', JSON.stringify(user));
    if (user.role === 'admin') navigate('/admin');
    else if (user.role === 'owner') navigate('/owner');
    else navigate('/home');
    return true;
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        if (response.data.user.role === 'admin') navigate('/admin');
        else if (response.data.user.role === 'owner') navigate('/owner');
        else navigate('/home');
      }
    } catch (err: any) {
      if (loginWithDemoAccount()) {
        return;
      }

      setError(err.response?.data?.message || 'Invalid credentials or server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-stone-50 bg-cover bg-center px-4 py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

      <div className="relative z-10 flex min-h-[calc(100vh-6rem)] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-lg bg-white/95 p-8 shadow-2xl"
        >
          <div className="text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-amber-600 font-black text-white">
              T
            </div>
            <h1 className="mt-4 text-4xl font-black text-zinc-950">Table d'Or</h1>
            <p className="mt-2 text-sm text-zinc-600">Sign in to book or manage tables.</p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 rounded-lg bg-stone-100 p-1">
            <button
              type="button"
              className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
                role === 'customer'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-950'
              }`}
              onClick={() => setRole('customer')}
            >
              <Utensils className="h-4 w-4" />
              Customer
            </button>
            <button
              type="button"
              className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
                role === 'owner'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-950'
              }`}
              onClick={() => setRole('owner')}
            >
              <Building2 className="h-4 w-4" />
              Owner
            </button>
            <button
              type="button"
              className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
                role === 'admin'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-950'
              }`}
              onClick={() => setRole('admin')}
            >
              <Shield className="h-4 w-4" />
              Admin
            </button>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-12 w-full rounded-lg border border-zinc-300 bg-white pl-10 pr-3 text-sm text-zinc-950 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                  placeholder={role === 'customer' ? 'demo@gmail.com' : role === 'admin' ? 'admin@gmail.com' : 'owner@gmail.com'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 w-full rounded-lg border border-zinc-300 bg-white pl-10 pr-10 text-sm text-zinc-950 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                  placeholder={role === 'customer' ? 'demo123' : 'owner123'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-zinc-950 px-4 py-3 text-sm font-black text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-zinc-400"
            >
              {loading ? 'Signing in...' : `Sign in as ${role === 'customer' ? 'Customer' : role === 'admin' ? 'Admin' : 'Owner'}`}
            </button>

            <p className="text-center text-sm text-zinc-600">
              New here?{' '}
              <Link to="/signup" className="font-bold text-amber-700 hover:text-amber-600">
                Create an account
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
