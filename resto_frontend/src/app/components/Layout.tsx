import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { LogOut, MapPin, Search, User } from 'lucide-react';

export function Layout() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isOwner = location.pathname.startsWith('/owner');
  const isAuth = location.pathname === '/' || location.pathname === '/signup';

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/home', { state: { searchQuery } });
  };

  if (isAuth || isOwner) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-zinc-900 font-sans">
      <header className="sticky top-0 z-50 bg-white/95 border-b border-zinc-200 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link
              to={isOwner ? '/owner' : '/home'}
              className="flex items-center gap-2 font-black text-xl text-zinc-950"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-600 text-white">
                T
              </span>
              Table d'Or
            </Link>

            {!isOwner && (
              <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-xl">
                <label className="sr-only" htmlFor="site-search">
                  Search restaurants
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <input
                    id="site-search"
                    type="text"
                    className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-28 text-sm outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                    placeholder="Search food, place, or cuisine"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                  <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 text-xs font-semibold text-zinc-500 lg:flex">
                    <MapPin className="h-3.5 w-3.5" />
                    Hyderabad
                  </span>
                </div>
              </form>
            )}

            <nav className="flex items-center gap-2">

              <Link
                to="/"
                className="rounded-lg border border-zinc-300 p-2 text-zinc-700 transition hover:border-rose-500 hover:text-rose-600"
                aria-label="Sign out"
              >
                {isOwner ? <LogOut className="h-5 w-5" /> : <User className="h-5 w-5" />}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto grid gap-6 px-4 py-8 text-sm text-zinc-600 sm:px-6 md:grid-cols-4 lg:px-8">
          <div className="md:col-span-2">
            <div className="font-black text-zinc-950">Table d'Or</div>
            <p className="mt-2 max-w-md">
              Book restaurant tables across Hyderabad with clear availability,
              menus, rupee pricing, and quick payment.
            </p>
          </div>
          <div>
            <div className="font-bold text-zinc-950">Customers</div>
            <p className="mt-2">Cuisines, table slots, menus, payments.</p>
          </div>
          <div>
            <div className="font-bold text-zinc-950">Owners</div>
            <p className="mt-2">Tables, photos, menu prices, bookings.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
