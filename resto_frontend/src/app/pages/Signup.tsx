import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AlertCircle, Building2, Lock, Mail, Phone, User, Utensils } from 'lucide-react';
import { motion } from 'motion/react';
import axios from 'axios';

export function Signup() {
  const [role, setRole] = useState<'customer' | 'owner'>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        phone,
        password,
        role,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate(response.data.user.role === 'owner' ? '/owner' : '/home');
      }
    } catch (err: any) {
      if (!err.response || err.response.status >= 500) {
        // Fallback for Demo Mode
        const fallbackUser = {
          _id: 'demo-user-' + Date.now(),
          name,
          email,
          phone,
          role,
          restaurant: null,
        };
        localStorage.setItem('token', 'demo-token-' + role);
        localStorage.setItem('user', JSON.stringify(fallbackUser));
        navigate(role === 'owner' ? '/owner' : '/home');
        return;
      }

      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-stone-50 bg-cover bg-center px-4 py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1600&q=80')",
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
            <h1 className="mt-4 text-4xl font-black text-zinc-950">Join Table d'Or</h1>
            <p className="mt-2 text-sm text-zinc-600">Create a customer or owner account.</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2 rounded-lg bg-stone-100 p-1">
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
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSignup}>
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-12 w-full rounded-lg border border-zinc-300 bg-white pl-10 pr-3 text-sm text-zinc-950 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                placeholder="Full name"
              />
            </div>

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
                placeholder={role === 'customer' ? 'customer@email.com' : 'owner@restaurant.com'}
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="h-12 w-full rounded-lg border border-zinc-300 bg-white pl-10 pr-3 text-sm text-zinc-950 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                placeholder="+91 99999 99999"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 w-full rounded-lg border border-zinc-300 bg-white pl-10 pr-3 text-sm text-zinc-950 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-zinc-950 px-4 py-3 text-sm font-black text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-zinc-400"
            >
              {loading ? 'Creating account...' : `Sign up as ${role === 'customer' ? 'Customer' : 'Owner'}`}
            </button>

            <p className="text-center text-sm text-zinc-600">
              Already have an account?{' '}
              <Link to="/" className="font-bold text-amber-700 hover:text-amber-600">
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
