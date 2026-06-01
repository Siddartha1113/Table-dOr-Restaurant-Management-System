import React, { useEffect, useState } from 'react';
import {
  Camera, CheckCircle2, Clock, Edit, ImagePlus, Plus, Save, Trash2, Utensils, Building2, MapPin, BarChart3, LayoutDashboard, ClipboardList, Settings, LogOut, ArrowRight, Activity, CalendarCheck, TrendingUp, Bell, Zap, ShoppingBag, Users, UserPlus, AlertTriangle
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { formatRupees } from '../currency';
import api from '../../api';

type OwnerTab = 'dashboard' | 'menu' | 'bookings' | 'analytics' | 'settings';

const tabMeta: Record<OwnerTab, { label: string; icon: React.ElementType }> = {
  dashboard: { label: 'Dashboard', icon: LayoutDashboard },
  menu: { label: 'Manage Menu', icon: Utensils },
  bookings: { label: 'Bookings', icon: ClipboardList },
  analytics: { label: 'Analytics', icon: BarChart3 },
  settings: { label: 'Settings', icon: Settings },
};

function statusStyle(status: string) {
  if (status === 'available') return 'border-emerald-200 bg-emerald-50 text-emerald-800';
  if (status === 'occupied') return 'border-rose-200 bg-rose-50 text-rose-800';
  return 'border-amber-200 bg-amber-50 text-amber-800';
}

const defaultChartData = [
  { time: '11:00', orders: 4 },
  { time: '13:00', orders: 12 },
  { time: '15:00', orders: 5 },
  { time: '17:00', orders: 8 },
  { time: '19:00', orders: 18 },
  { time: '21:00', orders: 24 },
  { time: '23:00', orders: 10 },
];

export function OwnerDashboard() {
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<OwnerTab>('dashboard');
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [historyBookings, setHistoryBookings] = useState<any[]>([]);
  const [settingsForm, setSettingsForm] = useState({ name: "", description: "", street: "" });
  const [logoUrl, setLogoUrl] = useState("");

  const [form, setForm] = useState({
    name: '', description: '', cuisine: 'Italian', street: '', city: 'Hyderabad', state: 'Telangana', priceRange: '₹₹'
  });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        if (userObj._id === 'demo-owner-id') {
          setRestaurant({
            name: "Demo Italian Fine Dining",
            description: "Experience premium dining.",
            photos: [
               { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' }
            ]
          });
          setMenuItems([
            { _id: 'm1', name: 'Truffle Pasta', description: 'Fresh truffle', price: 550 },
            { _id: 'm2', name: 'Margherita Pizza', description: 'Classic', price: 300 }
          ]);
          const demoSlots = [];
          for (let h = 11; h <= 23; h++) {
            for (let m of ['00', '15', '30', '45']) {
              if (h === 23 && m !== '00') continue;
              const time = `${h.toString().padStart(2, '0')}:${m}`;
              const booked = Math.floor(Math.random() * 21);
              demoSlots.push({ time, totalSeats: 20, bookedSeats: booked, availableSeats: 20 - booked });
            }
          }
          setStats({ stats: { totalRevenue: 15400, todayBookings: 12, totalConfirmedAllTime: 142 }, slotStatus: demoSlots });
          setLoading(false);
          return;
        } else if (userObj.restaurant) {
          const saved = JSON.parse(localStorage.getItem('demo-created-restaurants') || '[]');
          const found = saved.find((r: any) => r._id === userObj.restaurant);
          if (found) {
            setRestaurant(found);
            setMenuItems(found.menu || []);
          setSettingsForm({ name: found.name || "", description: found.description || "", street: found.address?.street || "" });
            setStats({
              stats: { totalRevenue: 0, todayBookings: 0, totalConfirmedAllTime: 0 },
              slotStatus: found.slots?.map((s: any) => ({ ...s, bookedSeats: 0, availableSeats: s.totalSeats })) || []
            });
            setLoading(false);
            return;
          }
        }
      } catch (e) {}
    }
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const res = await api.get('/owner/restaurant');
      if (res.data.success) {
        setRestaurant(res.data.restaurant);
        setMenuItems(res.data.restaurant.menu || []);
        setSettingsForm({ name: res.data.restaurant.name || "", description: res.data.restaurant.description || "", street: res.data.restaurant.address?.street || "" });
        fetchDashboard();
      }
    } catch (err: any) {
      if (err.response?.status === 404) setRestaurant(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/owner/dashboard');
      if (res.data.success) setStats(res.data.dashboard);
    } catch (err) {}
  };

  const fetchHistory = async () => {
    try {
      const res = await api.get('/owner/bookings?limit=50');
      if (res.data.success) setHistoryBookings(res.data.bookings);
    } catch (err) {}
  };

  useEffect(() => {
    if (activeTab === 'bookings') fetchHistory();
  }, [activeTab]);

  const handleUpdateLogo = async () => {
    if (!logoUrl) return;
    try {
      const res = await api.post('/owner/restaurant/logo-url', { url: logoUrl });
      if (res.data.success) {
        setRestaurant({...restaurant, photos: res.data.photos});
        setLogoUrl('');
        alert('Logo successfully applied!');
      }
    } catch(err) {
      alert('Error updating logo link.');
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.put('/owner/restaurant', {
        name: settingsForm.name,
        description: settingsForm.description,
        address: { street: settingsForm.street, city: restaurant?.address?.city || 'Hyderabad', state: restaurant?.address?.state || 'TS' }
      });
      if (res.data.success) {
        setRestaurant(res.data.restaurant);
        alert('Settings updated successfully!');
      }
    } catch(err) {
      alert('Error updating settings');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const defaultSlots = [];
    for (let h = 11; h <= 23; h++) {
      for (let m of ['00', '15', '30', '45']) {
        if (h === 23 && m !== '00') continue;
        defaultSlots.push({ time: `${h.toString().padStart(2, '0')}:${m}`, totalSeats: 20 });
      }
    }
    const payload = {
      name: form.name, description: form.description, cuisine: [form.cuisine],
      address: { street: form.street, city: form.city, state: form.state },
      priceRange: form.priceRange, totalTables: 10, slots: defaultSlots
    };
    try {
      const res = await api.post('/owner/restaurant', payload);
      if (res.data.success) {
        setRestaurant(res.data.restaurant);
        setMenuItems(res.data.restaurant.menu || []);
        setSettingsForm({ name: res.data.restaurant.name || "", description: res.data.restaurant.description || "", street: res.data.restaurant.address?.street || "" });
        fetchDashboard();
      }
    } catch (err: any) {
      const newDemo = { _id: 'demo-created-' + Date.now(), ...payload, photos: [], menu: [] };
      const saved = JSON.parse(localStorage.getItem('demo-created-restaurants') || '[]');
      saved.push(newDemo);
      localStorage.setItem('demo-created-restaurants', JSON.stringify(saved));
      let userStr = localStorage.getItem('user');
      if (userStr) {
        let u = JSON.parse(userStr);
        u.restaurant = newDemo._id;
        localStorage.setItem('user', JSON.stringify(u));
      }
      setRestaurant(newDemo);
      setStats({
        stats: { totalRevenue: 0, todayBookings: 0, totalConfirmedAllTime: 0 },
        slotStatus: defaultSlots.map(s => ({...s, bookedSeats: 0, availableSeats: s.totalSeats}))
      });
      setLoading(false);
    }
  };

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await api.post('/owner/restaurant/photos', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (res.data.success) setRestaurant({...restaurant, photos: res.data.photos});
    } catch (err) { alert("Error uploading photo."); }
  };

  const setPrimaryPhoto = async (id: string) => {
    try {
      const res = await api.put(`/owner/restaurant/photos/${id}/primary`);
      if (res.data.success) setRestaurant({...restaurant, photos: res.data.photos});
    } catch (err) {
      const photoIndex = restaurant.photos?.findIndex((p: any) => p._id === id || p.url === id);
      if (photoIndex !== undefined && photoIndex > 0) {
        const newPhotos = [...restaurant.photos];
        const [photo] = newPhotos.splice(photoIndex, 1);
        newPhotos.unshift(photo);
        setRestaurant({...restaurant, photos: newPhotos});
      }
    }
  };

  const deletePhoto = async (id: string) => {
    try {
      const res = await api.delete(`/owner/restaurant/photos/${id}`);
      if (res.data.success) setRestaurant({...restaurant, photos: restaurant.photos.filter((p:any) => p._id !== id)});
    } catch (err) { setRestaurant({...restaurant, photos: restaurant.photos.filter((p:any) => p._id !== id && p.url !== id)}); }
  };

  const uploadMenuPhoto = async (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    if (!e.target.files?.length) return;
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await api.post(`/owner/restaurant/menu/${itemId}/image`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      if(res.data.success) setMenuItems(menuItems.map(m => m._id === itemId ? res.data.item : m));
    } catch(err) { alert("Error uploading menu photo."); }
  };

  const addMenuItem = async () => {
    const name = prompt("Dish Name:");
    if (!name) return;
    const priceStr = prompt("Price (₹):", "300");
    if (!priceStr) return;
    const payload = { name, description: "Delicious new item", price: Number(priceStr), category: "main" };
    try {
      const res = await api.post('/owner/restaurant/menu', payload);
      if (res.data.success) setMenuItems(res.data.restaurant.menu);
    } catch (err) {
      setMenuItems([...menuItems, { _id: 'demo-item-'+Date.now(), ...payload }]);
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      const res = await api.delete(`/owner/restaurant/menu/${id}`);
      if (res.data.success) setMenuItems(res.data.restaurant.menu);
    } catch (err) { setMenuItems(menuItems.filter(m => m._id !== id)); }
  };

  if (loading) {
    return <div className="min-h-screen bg-stone-50 flex items-center justify-center font-bold text-zinc-500">Loading your workspace...</div>;
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-stone-50 px-4 py-8 flex items-center justify-center font-sans">
        <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
          <h2 className="text-2xl font-black text-zinc-950 mb-6">Create Your Restaurant Profile</h2>
          <form onSubmit={handleCreate} className="grid gap-4">
            <input required placeholder="Restaurant Name" className="border border-zinc-200 p-3 rounded-xl w-full outline-amber-500" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
            <textarea required placeholder="Description" className="border border-zinc-200 p-3 rounded-xl w-full outline-amber-500" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
            <input required placeholder="Cuisine (e.g. Italian)" className="border border-zinc-200 p-3 rounded-xl w-full outline-amber-500" value={form.cuisine} onChange={e=>setForm({...form, cuisine: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="Street Address" className="border border-zinc-200 p-3 rounded-xl w-full outline-amber-500" value={form.street} onChange={e=>setForm({...form, street: e.target.value})} />
              <input required placeholder="City" className="border border-zinc-200 p-3 rounded-xl w-full outline-amber-500" value={form.city} onChange={e=>setForm({...form, city: e.target.value})} />
            </div>
            <button type="submit" className="mt-4 w-full rounded-xl bg-amber-600 px-4 py-3 text-white font-bold hover:bg-amber-700 transition">Submit Details</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-stone-50 font-sans text-zinc-900">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-zinc-200 bg-white h-full z-20">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-zinc-100">
          <div className="flex items-center justify-center rounded-lg bg-amber-600 p-2 text-white shadow-sm">
            <Utensils className="h-5 w-5" />
          </div>
          <span className="text-xl font-black text-zinc-950">Table d'Or</span>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6">
          {(Object.keys(tabMeta) as OwnerTab[]).map((tab) => {
            const Icon = tabMeta[tab].icon;
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  active 
                    ? 'bg-amber-50 text-amber-800' 
                    : 'text-zinc-500 hover:bg-stone-50 hover:text-zinc-900'
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? 'text-amber-600' : 'text-zinc-400'}`} />
                {tabMeta[tab].label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-zinc-100 px-4 py-6">
          <div className="mb-6 px-2">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Active Store</p>
            <p className="text-sm font-bold text-zinc-950 truncate" title={restaurant?.name}>{restaurant?.name || 'Loading...'}</p>
          </div>
          <button 
            onClick={() => { localStorage.removeItem('user'); window.location.href = '/'; }}
            className="flex w-full items-center gap-3 px-2 text-sm font-semibold text-zinc-500 hover:text-rose-600 transition"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl p-6 md:p-8">
          
          <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-zinc-950">
                Welcome back, {restaurant?.owner?.name?.split(' ')[0] || 'Owner'}
              </h1>
              <p className="mt-2 text-sm text-zinc-500">Here's what's happening with your store today.</p>
            </div>
            <button 
              onClick={() => setActiveTab('bookings')}
              className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-amber-700"
            >
              View Active Bookings
            </button>
          </header>

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold text-zinc-500">Weekly Revenue</div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-3xl font-bold text-zinc-950">{formatRupees(stats?.stats?.totalRevenue || 0)}</div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                      <span className="text-lg font-bold text-emerald-600">₹</span>
                    </div>
                  </div>
                  <div className="mt-3"><span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">Live</span></div>
                </div>

                <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold text-zinc-500">Active Bookings</div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-3xl font-bold text-zinc-950">{stats?.slotStatus?.reduce((acc:any, s:any)=>acc+s.bookedSeats,0) || 0}</div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                      <Activity className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3"><span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">processing</span></div>
                </div>

                <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold text-zinc-500">Total Bookings</div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-3xl font-bold text-zinc-950">{stats?.stats?.totalConfirmedAllTime || 0}</div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3"><span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">overall</span></div>
                </div>

                <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold text-zinc-500">Today's Bookings</div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-3xl font-bold text-zinc-950">{stats?.stats?.todayBookings || 0}</div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                      <Clock className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3"><span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">today</span></div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="col-span-2 rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-zinc-950">Revenue Overview</h3>
                    <select className="rounded-lg border border-zinc-200 bg-stone-50 px-3 py-1 text-sm font-medium text-zinc-600 outline-none">
                      <option>This Week</option>
                      <option>This Month</option>
                    </select>
                  </div>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats?.chartData || defaultChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Area type="monotone" dataKey="orders" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
                    <h3 className="mb-4 text-lg font-bold text-zinc-950">Quick Actions</h3>
                    <div className="grid gap-3">
                      <button onClick={() => setActiveTab('menu')} className="group flex w-full items-center justify-between rounded-xl border border-zinc-100 bg-stone-50 p-4 transition-all hover:border-amber-200 hover:bg-amber-50">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm text-amber-600">
                            <Utensils className="h-5 w-5" />
                          </div>
                          <span className="font-semibold text-zinc-700">Manage Menu</span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-zinc-400 group-hover:text-amber-600" />
                      </button>
                      <button onClick={() => setActiveTab('analytics')} className="group flex w-full items-center justify-between rounded-xl border border-zinc-100 bg-stone-50 p-4 transition-all hover:border-amber-200 hover:bg-amber-50">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm text-emerald-600">
                            <TrendingUp className="h-5 w-5" />
                          </div>
                          <span className="font-semibold text-zinc-700">View Reports</span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-zinc-400 group-hover:text-emerald-600" />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-amber-200 bg-[#fffdf0] p-5">
                     <div className="flex items-center gap-2 text-amber-700">
                       <Clock className="h-5 w-5" />
                       <h3 className="font-bold">High Demand Alert</h3>
                     </div>
                     <p className="mt-3 text-sm leading-6 text-amber-900/80">
                       Expected peak hour in 30 mins based on historical data. Ensure staff is ready.
                     </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'menu' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-zinc-950">Manage Menu</h2>
                    <p className="text-sm text-zinc-500">Customer pages will show these prices in rupees.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addMenuItem}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-amber-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Item
                  </button>
                </div>

                <div className="grid gap-3">
                  {menuItems.map((item) => (
                    <div
                      key={item._id || item.name}
                      className="grid gap-4 rounded-xl border border-zinc-100 p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center bg-stone-50/50 hover:border-amber-200 transition"
                    >
                      <div>
                        <h3 className="font-bold text-zinc-900">{item.name}</h3>
                        <p className="text-sm text-zinc-500">{item.description || 'Restaurant menu item'}</p>
                      </div>
                      <div className="font-bold text-amber-800">{formatRupees(item.price)}</div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => deleteMenuItem(item._id)}
                          className="rounded-lg border border-zinc-200 p-2 text-zinc-500 transition hover:border-rose-500 hover:bg-rose-50 hover:text-rose-600 bg-white shadow-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {menuItems.length === 0 && (
                     <div className="py-10 text-center text-sm font-semibold text-zinc-400 border border-dashed border-zinc-200 rounded-xl bg-stone-50">Your menu is empty. Add a dish!</div>
                  )}
                </div>
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-zinc-950">Table Status</h2>
                    <p className="text-sm text-zinc-500">Overview of upcoming slots for today.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {stats?.slotStatus?.map((slot: any) => (
                    <div key={slot.time} className="rounded-xl border border-zinc-100 p-4 transition-all hover:border-amber-300 hover:shadow-md bg-stone-50/50">
                      <div className="flex items-center gap-3 border-b border-zinc-200/50 pb-3">
                        <div className="text-lg font-bold text-zinc-900">{slot.time}</div>
                        <div className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-800">
                          {slot.bookedSeats} Booked
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm font-medium text-zinc-500">
                          Capacity: {slot.totalSeats}
                        </div>
                        <div className="text-sm font-bold text-emerald-600">
                          {slot.availableSeats} Available
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!stats?.slotStatus || stats.slotStatus.length === 0) && (
                    <div className="text-sm font-medium text-zinc-400">No slot data available. Please customize your slots under settings (Coming Soon).</div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm flex flex-col">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-zinc-950">Booking History</h2>
                  <p className="text-sm text-zinc-500">Comprehensive list of all past and upcoming reservations.</p>
                </div>
                <div className="overflow-x-auto rounded-xl border border-zinc-100 bg-white">
                  <table className="w-full text-left text-sm text-zinc-600">
                    <thead className="bg-stone-50 text-xs uppercase text-zinc-500 border-b border-zinc-100">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Date & Time</th>
                        <th className="px-6 py-4 font-semibold">Customer</th>
                        <th className="px-6 py-4 font-semibold">Guests</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyBookings.map((booking) => (
                        <tr key={booking._id || booking.id} className="border-b border-zinc-50 hover:bg-stone-50/50 transition">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-zinc-900">
                              {new Date(booking.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-zinc-400 mt-1">{booking.timeSlot}</div>
                          </td>
                          <td className="px-6 py-4 font-medium text-zinc-700">
                            {booking.customer?.name || 'Walk-in Customer'}
                          </td>
                          <td className="px-6 py-4 font-medium text-zinc-700">
                            {booking.guestCount}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                              booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                              booking.status === 'cancelled' ? 'bg-rose-100 text-rose-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-amber-800">
                            {formatRupees(booking.totalAmount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {historyBookings.length === 0 && (
                     <div className="p-8 text-center text-sm font-semibold text-zinc-400">No history available</div>
                  )}
                </div>
              </div>

            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-black text-zinc-950">Analytics & Reports</h2>
                  <p className="text-sm text-zinc-500">In-depth insights into your restaurant's performance.</p>
                </div>
                <select className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-bold text-zinc-700 outline-none shadow-sm">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Year</option>
                </select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Breakdown */}
                <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-zinc-950 mb-6">Revenue Over Time</h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats?.chartData || defaultChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Area type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Popular Times */}
                <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-zinc-950 mb-6">Popular Booking Times</h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats?.chartData || defaultChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                        <Tooltip cursor={{ fill: '#f4f4f5' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Bar dataKey="orders" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-zinc-950 mb-6">Customer Insights</h3>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-50 pb-4">
                      <div>
                        <div className="text-sm font-semibold text-zinc-500">New vs Returning</div>
                        <div className="text-xl font-bold text-zinc-900 mt-1">68% / 32%</div>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <Users className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b border-zinc-50 pb-4">
                      <div>
                        <div className="text-sm font-semibold text-zinc-500">Avg. Party Size</div>
                        <div className="text-xl font-bold text-zinc-900 mt-1">3.4 Guests</div>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                        <UserPlus className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-zinc-500">Cancellation Rate</div>
                        <div className="text-xl font-bold text-zinc-900 mt-1">4.2%</div>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-zinc-950 mb-6">Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-stone-50 p-4 border border-zinc-100">
                       <div className="text-sm font-semibold text-zinc-500 mb-1">Table Turnover Rate</div>
                       <div className="text-2xl font-black text-zinc-900">1.8x</div>
                       <div className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                         <TrendingUp className="h-3 w-3" /> +12% from last week
                       </div>
                    </div>
                    <div className="rounded-xl bg-stone-50 p-4 border border-zinc-100">
                       <div className="text-sm font-semibold text-zinc-500 mb-1">Average Spend / Table</div>
                       <div className="text-2xl font-black text-zinc-900">₹2,450</div>
                       <div className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                         <TrendingUp className="h-3 w-3" /> +5% from last week
                       </div>
                    </div>
                    <div className="rounded-xl bg-stone-50 p-4 border border-zinc-100">
                       <div className="text-sm font-semibold text-zinc-500 mb-1">Busiest Day</div>
                       <div className="text-2xl font-black text-zinc-900">Saturday</div>
                       <div className="text-xs font-semibold text-amber-600 mt-2 flex items-center gap-1">
                         35% of weekly volume
                       </div>
                    </div>
                    <div className="rounded-xl bg-stone-50 p-4 border border-zinc-100">
                       <div className="text-sm font-semibold text-zinc-500 mb-1">Peak Occupancy</div>
                       <div className="text-2xl font-black text-zinc-900">92%</div>
                       <div className="text-xs font-semibold text-zinc-500 mt-2 flex items-center gap-1">
                         Usually at 20:00 - 21:00
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm mb-6">
                <div className="flex items-center gap-2 mb-6 text-zinc-950 border-b border-zinc-100 pb-4">
                  <ImagePlus className="h-6 w-6 text-amber-600" />
                  <h2 className="text-xl font-bold">Restaurant Logo Image URL</h2>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="h-20 w-20 bg-stone-100 border border-zinc-200 rounded-lg flex-shrink-0 overflow-hidden">
                    {restaurant.photos?.length > 0 ? (
                       <img src={restaurant.photos[0].url.startsWith('http') ? restaurant.photos[0].url : `http://localhost:5000${restaurant.photos[0].url}`} className="w-full h-full object-cover" alt="Logo" />
                    ) : (
                       <div className="w-full h-full grid place-items-center"><ImagePlus className="text-zinc-300 w-8 h-8"/></div>
                    )}
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                     <input value={logoUrl} onChange={(e)=>setLogoUrl(e.target.value)} className="w-full border border-zinc-200 rounded-lg p-3 outline-amber-500 bg-stone-50" placeholder="https://example.com/logo.jpg" />
                     <div className="flex items-center justify-between">
                       <p className="text-xs text-zinc-500">Provide a direct URL to a valid image. It will display on the customer portal.</p>
                       <button type="button" onClick={handleUpdateLogo} disabled={!logoUrl} className="rounded-lg bg-amber-600 px-4 py-2 font-bold text-white transition hover:bg-amber-700 shadow-sm text-sm disabled:bg-zinc-300 disabled:cursor-not-allowed">Apply Logo Link</button>
                     </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-zinc-950 border-b border-zinc-100 pb-4">
                  <Building2 className="h-6 w-6 text-amber-600" />
                  <h2 className="text-xl font-bold">General Information</h2>
                </div>
                <form className="space-y-6" onSubmit={handleUpdateSettings}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-zinc-700">Restaurant Name</label>
                       <input value={settingsForm.name} onChange={(e)=>setSettingsForm({...settingsForm, name: e.target.value})} className="w-full border border-zinc-200 rounded-lg p-3 outline-amber-500 bg-stone-50" placeholder="Delicious Bites" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-zinc-700">Email Address</label>
                       <input disabled value={restaurant?.owner?.email || 'contact@restaurant.com'} className="w-full border border-zinc-200 rounded-lg p-3 outline-none bg-stone-100 text-zinc-500 cursor-not-allowed" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-zinc-700">Phone Number</label>
                       <input disabled value={restaurant?.owner?.phone || '+91 9876543210'} className="w-full border border-zinc-200 rounded-lg p-3 outline-none bg-stone-100 text-zinc-500 cursor-not-allowed" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-zinc-700">Address (Street)</label>
                       <input value={settingsForm.street} onChange={(e)=>setSettingsForm({...settingsForm, street: e.target.value})} className="w-full border border-zinc-200 rounded-lg p-3 outline-amber-500 bg-stone-50" placeholder="123 Main Street..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-semibold text-zinc-700">Description</label>
                     <textarea value={settingsForm.description} onChange={(e)=>setSettingsForm({...settingsForm, description: e.target.value})} rows={3} className="w-full border border-zinc-200 rounded-lg p-3 outline-amber-500 bg-stone-50" placeholder="A brief description of your restaurant..." />
                  </div>
                  <div className="flex justify-end pt-4">
                     <button type="submit" className="rounded-lg bg-amber-600 px-6 py-2.5 font-bold text-white transition hover:bg-amber-700 shadow-sm flex items-center gap-2">
                       <Save className="h-5 w-5" />
                       Save Changes
                     </button>
                  </div>
                </form>
              </div>

              <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-zinc-950">Photos</h2>
                    <p className="text-sm text-zinc-500">Images used on cuisine, listing, and restaurant pages.</p>
                  </div>
                  <label htmlFor="photo-upload" className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-amber-700">
                    <ImagePlus className="h-4 w-4" />
                    Upload Photo
                    <input type="file" id="photo-upload" className="hidden" accept="image/*" onChange={uploadPhoto} />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {restaurant.photos?.map((photo: any, index: number) => (
                    <div key={`${photo._id || index}`} className="group relative overflow-hidden rounded-xl border border-zinc-200/60 aspect-square shadow-sm">
                      <img
                        src={`http://localhost:5000${photo.url}`}
                        alt={photo.caption || `${restaurant.name}`}
                        className="h-full w-full object-cover"
                        onError={(e: any) => { e.target.src = photo.url }}
                      />
                      {index === 0 && (
                        <div className="absolute left-2 top-2 rounded-md bg-zinc-900 px-2 py-1 text-xs font-black text-white shadow">
                          Profile
                        </div>
                      )}
                      <div className="absolute inset-x-2 bottom-2 flex gap-2 opacity-0 transition group-hover:opacity-100">
                        {index > 0 && (
                           <button onClick={() => setPrimaryPhoto(photo._id)} className="flex-1 rounded-lg bg-white/95 py-1.5 text-xs font-bold text-zinc-900 shadow hover:bg-white hover:text-amber-600 transition">
                             Set Profile
                           </button>
                        )}
                      </div>
                      <button onClick={() => deletePhoto(photo._id)} className="absolute right-2 top-2 rounded-lg bg-white p-2 text-rose-600 opacity-0 shadow-sm transition group-hover:opacity-100 hover:bg-rose-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <label htmlFor="photo-upload" className="cursor-pointer grid aspect-square place-items-center rounded-xl border-2 border-dashed border-zinc-200 bg-stone-50 text-center text-zinc-400 hover:border-amber-400 transition hover:bg-amber-50 hover:text-amber-600">
                    <div>
                      <ImagePlus className="mx-auto h-8 w-8" />
                      <p className="mt-2 text-sm font-bold">Add photo</p>
                    </div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      
      </main>
    </div>
  );
}