import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Map, 
  MapPin,
  Wallet, 
  Megaphone, 
  CalendarDays, 
  Headset, 
  Settings, 
  Bell, 
  Search,
  IndianRupee,
  Users,
  Store,
  Ticket,
  Clock,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import api from '../../api';

type TabType = 'dashboard' | 'map' | 'finance' | 'marketing' | 'reservations' | 'support' | 'settings';

export function AdminPortal() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [stats, setStats] = useState({
    revenue: 4523450,
    bookings: 287,
    activeCustomers: 3451,
    liveRestaurants: 38
  });

  useEffect(() => {
    // Load live restaurant data using our generated database
    api.get('/restaurants?limit=40')
      .then(res => {
        if(res.data.success) setRestaurants(res.data.data || res.data.restaurants || []);
      })
      .catch(console.error);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'map', label: 'Operations Map', icon: Map },
    { id: 'finance', label: 'Finance', icon: Wallet },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'reservations', label: 'Reservations', icon: CalendarDays },
    { id: 'support', label: 'Helpdesk', icon: Headset },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-950 text-zinc-300 flex flex-col shadow-xl z-20 shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-zinc-800">
          <div className="text-2xl font-black text-amber-500 tracking-tight">Table d'Or</div>
          <div className="ml-2 text-xs font-bold uppercase tracking-wider text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">Admin</div>
        </div>
        
        <div className="flex-1 py-6 overflow-y-auto px-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-amber-500 text-zinc-950 shadow-md' 
                  : 'hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-black">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Super Admin</p>
              <p className="text-xs text-zinc-500 truncate">System Configurator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-zinc-200 px-8 flex items-center justify-between shrink-0 z-10 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-zinc-950">Platform Analytics</h1>
            <p className="text-xs font-bold text-zinc-500 tracking-wide uppercase mt-1">
              Last Updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="pl-10 pr-4 py-2 w-64 bg-stone-100 border-none rounded-full text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <button className="relative p-2 bg-stone-100 text-zinc-600 rounded-full hover:bg-stone-200 transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Canvas */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-stone-50 p-8">
          {activeTab === 'dashboard' && <DashboardModule stats={stats} restaurants={restaurants} />}
          {activeTab === 'map' && <OperationsMapModule restaurants={restaurants} />}
          {activeTab === 'finance' && <FinanceModule restaurants={restaurants} />}
          {activeTab === 'marketing' && <MarketingModule restaurants={restaurants} />}
          {activeTab === 'reservations' && <ReservationsModule restaurants={restaurants} />}
          {activeTab === 'support' && <HelpdeskModule restaurants={restaurants} />}
          {activeTab === 'settings' && <SettingsModule />}
        </main>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD MODULE
// ─────────────────────────────────────────────────────────────
function DashboardModule({ stats, restaurants }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-[1600px] mx-auto">
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Platform Revenue" value={`₹${stats.revenue.toLocaleString()}`} change="+12.5%" icon={IndianRupee} color="emerald" />
        <StatCard title="Bookings Today" value={stats.bookings} subtitle="142 Confirmed • 89 Pending" change="+8.2%" icon={Ticket} color="amber" />
        <StatCard title="Active Customers" value={stats.activeCustomers.toLocaleString()} subtitle="+45 new today" change="+15.3%" icon={Users} color="blue" />
        <StatCard title="Live Restaurants" value={`${stats.liveRestaurants}/40`} subtitle="2 Under Maintenance" change="95% Up" icon={Store} color="indigo" />
      </div>

      {/* Operational Snapshots */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black text-zinc-900">7-Day Revenue & Booking Trends</h2>
              <button className="text-sm font-bold text-amber-600 hover:underline">Export Report</button>
           </div>
           
           {/* Pure CSS Placeholder for Dual Axis Chart */}
           <div className="h-64 w-full flex items-end gap-2 px-4 relative mt-10 border-b border-zinc-200">
             {/* Y-Axis markers */}
             <div className="absolute left-0 bottom-0 top-0 w-full flex flex-col justify-between text-xs text-zinc-400 pb-2 pointer-events-none">
                <div className="border-t border-zinc-100 w-full">500k</div>
                <div className="border-t border-zinc-100 w-full">250k</div>
                <div className="border-t border-zinc-950 w-full">0</div>
             </div>
             
             {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group z-10 relative">
                  <div className="w-full bg-amber-100 rounded-t-md border-t-4 border-amber-400 group-hover:bg-amber-200 transition-colors" style={{ height: `${h}%` }}></div>
                  <span className="text-xs font-bold text-zinc-500 absolute -bottom-6">Day {i+1}</span>
                  
                  {/* Fake Line Chart Node */}
                  <div className="absolute bg-indigo-500 w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{ bottom: `${h + 10}%` }}></div>
                </div>
             ))}
             {/* Fake SVG Line */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <path d="M 50 150 L 150 100 L 250 140 L 350 50 L 450 110 L 550 20 L 650 60" fill="none" stroke="currentColor" strokeWidth="3" className="text-indigo-500 opacity-50" />
             </svg>
           </div>
        </div>

        <div className="rounded-2xl bg-zinc-950 text-white p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
           <div className="absolute -right-10 -top-10 w-40 h-40 bg-zinc-900 rounded-full blur-2xl"></div>
           <div>
             <h2 className="text-lg font-black text-zinc-100 mb-6 relative z-10">Operational Snapshot</h2>
             <div className="space-y-6 relative z-10">
               <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-1">Avg Table Wait Time</p>
                  <div className="flex items-end gap-2">
                     <span className="text-4xl font-black text-white">12</span>
                     <span className="text-zinc-500 font-bold mb-1">min</span>
                  </div>
               </div>
               <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-1">Turnaround Time</p>
                  <div className="flex items-end gap-2">
                     <span className="text-4xl font-black text-white">1.5</span>
                     <span className="text-zinc-500 font-bold mb-1">hours</span>
                  </div>
               </div>
               <div>
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-1">Pending Support Tickets</p>
                  <div className="flex items-end gap-2">
                     <span className="text-4xl font-black text-rose-500">7</span>
                     <span className="text-rose-500/50 font-bold mb-1">HIGH PRIORITY</span>
                  </div>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Two Column Tables */}
      <div className="grid xl:grid-cols-2 gap-6">
        
        {/* Left Col: Customers */}
        <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-stone-50/50">
            <h3 className="font-black text-zinc-900 text-lg">Recent Signups</h3>
            <button className="text-sm font-bold text-amber-600 hover:text-amber-700">View All Customers</button>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-zinc-50 text-zinc-500 text-xs uppercase tracking-wider font-bold">
                 <tr>
                   <th className="px-6 py-4">Customer ID</th>
                   <th className="px-6 py-4">Name & Email</th>
                   <th className="px-6 py-4">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-zinc-100 bg-white">
                 {['Rajesh Kumar', 'Priya Singh', 'Amit Patel', 'Sneha Reddy', 'Vikram Sharma'].map((name, i) => (
                   <tr key={i} className="hover:bg-stone-50 transition-colors">
                     <td className="px-6 py-4 font-mono text-zinc-500 text-xs">CUST_{2847 - i}</td>
                     <td className="px-6 py-4">
                       <div className="font-bold text-zinc-900">{name}</div>
                       <div className="text-zinc-500 text-xs">{name.split(' ')[0].toLowerCase()}@email.com</div>
                     </td>
                     <td className="px-6 py-4">
                       <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">Active</span>
                     </td>
                   </tr>
                 ))}
               </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Restaurants Integration Requirement */}
        <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-stone-50/50">
            <h3 className="font-black text-zinc-900 text-lg">Partner Onboarding</h3>
            <button className="text-sm font-bold text-amber-600 hover:text-amber-700">Manage Pipeline</button>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead className="bg-zinc-50 text-zinc-500 text-xs uppercase tracking-wider font-bold">
                 <tr>
                   <th className="px-6 py-4">Restaurant</th>
                   <th className="px-6 py-4">Cuisine</th>
                   <th className="px-6 py-4">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-zinc-100 bg-white">
                 {restaurants.slice(0, 5).map((r: any, i: number) => {
                   const imgPath = r.photos?.[0]?.url || r.images?.[0] || '';
                   const fullImg = imgPath.startsWith('http') ? imgPath : `http://localhost:5000${imgPath}`;
                   return (
                     <tr key={r._id || i} className="hover:bg-stone-50 transition-colors">
                       <td className="px-6 py-4 flex items-center gap-4">
                         <div className="w-16 h-12 rounded-lg border border-zinc-200 bg-stone-100 overflow-hidden shrink-0">
                           {fullImg && <img src={fullImg} className="w-full h-full object-cover" alt="Restaurant" loading="lazy" />}
                         </div>
                         <div>
                           <div className="font-bold text-zinc-900 line-clamp-1">{r.name}</div>
                           <div className="font-mono text-zinc-400 text-[10px] uppercase mt-0.5">REST_{String(i+1).padStart(3, '0')}</div>
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <div className="text-zinc-600 font-medium">{r.cuisine?.[0] || 'Fusion'}</div>
                       </td>
                       <td className="px-6 py-4">
                         <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                           i === 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                         }`}>
                           {i === 0 ? 'In Review' : 'Onboarded'}
                         </span>
                       </td>
                     </tr>
                   )
                 })}
                 {restaurants.length === 0 && (
                   <tr><td colSpan={3} className="p-8 text-center text-zinc-500">Loading restaurants...</td></tr>
                 )}
               </tbody>
            </table>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// OPERATIONS MAP MODULE
// ─────────────────────────────────────────────────────────────
function OperationsMapModule({ restaurants }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col gap-6 max-w-[1600px] mx-auto">
      
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black text-zinc-950">Coverage & Operations Map</h2>
            <p className="text-sm text-zinc-500 font-medium mt-1">Live visualization of your 40 partner restaurants across Hyderabad.</p>
         </div>
         <div className="flex gap-2">
            <select className="px-4 py-2 rounded-lg border border-zinc-200 text-sm font-bold outline-none focus:border-amber-500 bg-white">
               <option>All Cuisines</option>
               <option>Italian</option>
               <option>Asian</option>
               <option>Indian</option>
               <option>Mexican</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-zinc-200 text-sm font-bold outline-none focus:border-amber-500 bg-white">
               <option>Booking Volume: Heavy</option>
               <option>Booking Volume: Moderate</option>
            </select>
         </div>
      </div>

      <div className="flex-1 rounded-2xl bg-zinc-200 border border-zinc-300 relative overflow-hidden shadow-inner group">
         {/* Fake Map Background */}
         <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80" 
            className="w-full h-full object-cover blur-sm opacity-60 pointer-events-none"
            alt="Hyd Map Background"
         />
         
         <div className="absolute inset-0">
           {restaurants.map((r: any, i: number) => {
              // Use real database coordinates mapped to Hyderabad bounds
              const [lng, lat] = r.location?.coordinates || [78.4, 17.4];
              const minLat = 17.35, maxLat = 17.50;
              const minLng = 78.30, maxLng = 78.55;
              
              // Lat maps to Y (inverted), Lng maps to X
              let top = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
              let left = ((lng - minLng) / (maxLng - minLng)) * 100;
              
              // Keep pins within visual bounds safely
              top = Math.max(5, Math.min(95, top));
              left = Math.max(5, Math.min(95, left));

              const imgPath = r.photos?.[0]?.url || r.images?.[0] || '';
              const fullImg = imgPath.startsWith('http') ? imgPath : `http://localhost:5000${imgPath}`;

              return (
                 <div 
                   key={r._id || i}
                   style={{ top: `${top}%`, left: `${left}%` }}
                   className="absolute group/pin cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10 hover:z-50"
                 >
                    {/* Map Marker Pin */}
                    <div className="relative">
                       <MapPin className="w-8 h-8 text-rose-600 drop-shadow-md z-20 relative transition-transform group-hover/pin:scale-125" />
                       <div className="absolute w-4 h-4 bg-rose-600 rounded-full animate-ping opacity-50 inset-0 m-auto"></div>
                    </div>

                    {/* Hover Detail Card */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white w-64 rounded-xl shadow-2xl border border-zinc-200 overflow-hidden opacity-0 invisible group-hover/pin:opacity-100 group-hover/pin:visible transition-all origin-bottom scale-95 group-hover/pin:scale-100 pointer-events-none">
                       <div className="h-32 bg-stone-100 w-full relative">
                         {fullImg && <img src={fullImg} className="w-full h-full object-cover" />}
                         <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-black px-2 py-1 rounded backdrop-blur-sm">
                           {r.cuisine?.[0]}
                         </div>
                       </div>
                       <div className="p-4">
                         <h4 className="font-black text-zinc-950 truncate">{r.name}</h4>
                         <p className="text-xs text-zinc-500 font-medium truncate mt-1">{r.address?.street}</p>
                         <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3">
                            <div>
                               <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Live Bookings</p>
                               <p className="text-sm font-black text-amber-600">{Math.floor(Math.random() * 20)} Active</p>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Rating</p>
                               <p className="text-sm font-black text-emerald-600">★ {r.averageRating}</p>
                            </div>
                         </div>
                       </div>
                    </div>
                 </div>
              )
           })}
         </div>

         {/* Overlay legend */}
         <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl border border-zinc-200 shadow-lg pointer-events-auto max-w-sm">
               <h3 className="font-black text-zinc-900 text-sm mb-3">Booking Hotspots Overlay</h3>
               <div className="h-2 w-full rounded-full bg-gradient-to-r from-blue-400 via-emerald-400 via-amber-400 to-rose-600"></div>
               <div className="flex justify-between mt-2 text-[10px] font-bold text-zinc-500 uppercase">
                  <span>Low Vol</span>
                  <span>Peak Vol</span>
               </div>
            </div>
         </div>
      </div>

    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// SHARED UTILITIES
// ─────────────────────────────────────────────────────────────
function StatCard({ title, value, change, icon: Icon, color, subtitle }: any) {
  const colors: Record<string, string> = {
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    amber: 'text-amber-600 bg-amber-50 border-amber-100',
    blue: 'text-blue-600 bg-blue-50 border-blue-100',
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm overflow-hidden relative group hover:border-amber-300 transition-colors">
      <div className="flex justify-between items-start mb-4">
         <div className={`p-3 rounded-xl ${colors[color]} shrink-0 transition-transform group-hover:scale-110`}>
            <Icon className="w-6 h-6" />
         </div>
         <div className="px-2.5 py-1 bg-zinc-100 rounded-full text-xs font-bold text-zinc-600 flex items-center">
            {change.startsWith('+') ? <ArrowUpRight className="w-3 h-3 mr-1 text-emerald-600" /> : null}
            {change}
         </div>
      </div>
      <div>
         <h3 className="text-zinc-500 font-bold text-sm mb-1">{title}</h3>
         <div className="text-3xl font-black text-zinc-950 tracking-tight">{value}</div>
         {subtitle && <p className="text-xs text-zinc-400 font-medium mt-2">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FINANCE MODULE
// ─────────────────────────────────────────────────────────────
function FinanceModule({ restaurants }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black text-zinc-950">Platform Finance Dashboard</h2>
            <p className="text-sm text-zinc-500 font-medium mt-1">Manage revenue, payouts, and commissions.</p>
         </div>
         <button className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-bold shadow-sm">Export Report</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Commission Revenue" value="₹45,23,450" subtitle="8-12% Commission Rate" change="+15.3%" icon={Wallet} color="emerald" />
        <StatCard title="Pending Payouts" value="₹39,87,230" subtitle="Next Cycle: Jan 20, 2024" change="-2.1%" icon={IndianRupee} color="amber" />
        <StatCard title="Net Platform Profit" value="₹5,36,220" subtitle="Margin: 11.2%" change="+8.4%" icon={BarChart3} color="indigo" />
      </div>

      <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-zinc-100 bg-stone-50/50">
            <h3 className="font-black text-zinc-900 text-lg">Restaurant Partner Payouts</h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead className="bg-zinc-50 text-zinc-500 text-xs uppercase tracking-wider font-bold">
                 <tr>
                   <th className="px-6 py-4">Restaurant</th>
                   <th className="px-6 py-4">Gross Revenue</th>
                   <th className="px-6 py-4">Commission</th>
                   <th className="px-6 py-4">Net Payout</th>
                   <th className="px-6 py-4">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-zinc-100 bg-white">
                 {restaurants.slice(0, 8).map((r: any, i: number) => {
                   const imgPath = r.photos?.[0]?.url || r.images?.[0] || '';
                   const fullImg = imgPath.startsWith('http') ? imgPath : `http://localhost:5000${imgPath}`;
                   const gross = Math.floor(Math.random() * 500000) + 100000;
                   const comm = Math.floor(gross * 0.1);
                   return (
                     <tr key={r._id || i} className="hover:bg-stone-50">
                       <td className="px-6 py-4 flex items-center gap-4">
                         <div className="w-10 h-10 rounded-lg bg-stone-100 overflow-hidden shrink-0">
                           {fullImg && <img src={fullImg} className="w-full h-full object-cover" alt="" />}
                         </div>
                         <div className="font-bold text-zinc-900">{r.name}</div>
                       </td>
                       <td className="px-6 py-4 font-mono">₹{gross.toLocaleString()}</td>
                       <td className="px-6 py-4 font-mono text-rose-600">-₹{comm.toLocaleString()}</td>
                       <td className="px-6 py-4 font-mono font-bold text-emerald-600">₹{(gross-comm).toLocaleString()}</td>
                       <td className="px-6 py-4">
                         <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${i % 3 === 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                           {i % 3 === 0 ? 'Pending' : 'Completed'}
                         </span>
                       </td>
                     </tr>
                   )
                 })}
               </tbody>
            </table>
         </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// MARKETING MODULE
// ─────────────────────────────────────────────────────────────
function MarketingModule({ restaurants }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black text-zinc-950">Platform Marketing Hub</h2>
            <p className="text-sm text-zinc-500 font-medium mt-1">Campaigns, promos, and featured restaurants.</p>
         </div>
         <button className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-bold shadow-sm">New Campaign</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Campaigns" value="4" subtitle="Reaching 12k users" change="+1" icon={Megaphone} color="blue" />
        <StatCard title="Promo Codes Used" value="1,284" subtitle="This month" change="+24%" icon={Ticket} color="amber" />
        <StatCard title="Marketing Revenue" value="₹8,45,000" subtitle="Attributed bookings" change="+18%" icon={IndianRupee} color="emerald" />
        <StatCard title="Customer Reach" value="45.2k" subtitle="Email + Push" change="+5%" icon={Users} color="indigo" />
      </div>

      <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm p-6">
         <h3 className="font-black text-zinc-900 text-lg mb-6">Featured Restaurants Placement</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {restaurants.slice(0, 4).map((r: any, i: number) => {
               const imgPath = r.photos?.[0]?.url || r.images?.[0] || '';
               const fullImg = imgPath.startsWith('http') ? imgPath : `http://localhost:5000${imgPath}`;
               return (
                  <div key={i} className="border border-amber-200 rounded-xl overflow-hidden relative group">
                     <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-black px-2 py-1 rounded z-10 shadow-sm uppercase">Sponsored</div>
                     <div className="h-32 bg-stone-100 w-full relative">
                        {fullImg && <img src={fullImg} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                     </div>
                     <div className="p-4 bg-amber-50/30">
                        <h4 className="font-black text-zinc-900 truncate">{r.name}</h4>
                        <p className="text-xs text-zinc-500 mt-1">{r.cuisine?.[0]}</p>
                        <div className="mt-4 flex justify-between items-center">
                           <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded">Tier 1</span>
                           <button className="text-xs font-bold text-zinc-900 hover:underline">Edit Placement</button>
                        </div>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// RESERVATIONS MODULE
// ─────────────────────────────────────────────────────────────
function ReservationsModule({ restaurants }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-[1600px] mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black text-zinc-950">Real-Time Reservations</h2>
            <p className="text-sm text-zinc-500 font-medium mt-1">Live tracking of all platform table bookings.</p>
         </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl p-4 flex gap-4 overflow-x-auto shadow-sm">
         <input type="text" placeholder="Search booking ID or customer..." className="px-4 py-2 bg-stone-100 rounded-lg text-sm font-medium outline-none min-w-[250px]" />
         <select className="px-4 py-2 bg-stone-100 rounded-lg text-sm font-medium outline-none"><option>All Statuses</option><option>Confirmed</option></select>
         <select className="px-4 py-2 bg-stone-100 rounded-lg text-sm font-medium outline-none"><option>Today</option><option>This Week</option></select>
         <select className="px-4 py-2 bg-stone-100 rounded-lg text-sm font-medium outline-none"><option>All Restaurants</option></select>
      </div>

      <div className="flex-1 rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
         <div className="overflow-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-zinc-50 text-zinc-500 text-xs uppercase tracking-wider font-bold sticky top-0 z-10 shadow-sm">
                 <tr>
                   <th className="px-6 py-4">Booking ID</th>
                   <th className="px-6 py-4">Customer</th>
                   <th className="px-6 py-4">Restaurant</th>
                   <th className="px-6 py-4">Date & Time</th>
                   <th className="px-6 py-4">Party Size</th>
                   <th className="px-6 py-4">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-zinc-100">
                 {restaurants.slice(0, 10).map((r: any, i: number) => {
                   const imgPath = r.photos?.[0]?.url || r.images?.[0] || '';
                   const fullImg = imgPath.startsWith('http') ? imgPath : `http://localhost:5000${imgPath}`;
                   const statuses = ['Confirmed', 'Seated', 'Pending', 'Completed'];
                   const status = statuses[i % 4];
                   const colors: Record<string, string> = {
                     'Confirmed': 'bg-blue-100 text-blue-800',
                     'Seated': 'bg-amber-100 text-amber-800',
                     'Pending': 'bg-zinc-100 text-zinc-800',
                     'Completed': 'bg-emerald-100 text-emerald-800',
                   };
                   
                   return (
                     <tr key={i} className="hover:bg-stone-50 cursor-pointer">
                       <td className="px-6 py-4 font-mono text-zinc-500 text-xs">#BK-{10482 + i}</td>
                       <td className="px-6 py-4 font-bold text-zinc-900">User {100 + i}</td>
                       <td className="px-6 py-4 flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-stone-100 overflow-hidden shrink-0">
                           {fullImg && <img src={fullImg} className="w-full h-full object-cover" alt="" />}
                         </div>
                         <div className="font-bold text-zinc-700">{r.name}</div>
                       </td>
                       <td className="px-6 py-4">Today, 19:30</td>
                       <td className="px-6 py-4 font-bold">{2 + (i % 4)} Guests</td>
                       <td className="px-6 py-4">
                         <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${colors[status]}`}>{status}</span>
                       </td>
                     </tr>
                   )
                 })}
               </tbody>
            </table>
         </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// HELPDESK MODULE
// ─────────────────────────────────────────────────────────────
function HelpdeskModule({ restaurants }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black text-zinc-950">Support & Helpdesk Center</h2>
            <p className="text-sm text-zinc-500 font-medium mt-1">Manage partner and customer inquiries.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard title="Open Tickets" value="14" subtitle="7 High Priority" change="-2" icon={Headset} color="amber" />
        <StatCard title="Avg Response Time" value="2.5h" subtitle="Within SLA limits" change="-15m" icon={Clock} color="emerald" />
        <StatCard title="Satisfaction Score" value="4.8/5" subtitle="Last 30 days" change="+0.1" icon={Users} color="indigo" />
      </div>

      <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead className="bg-zinc-50 text-zinc-500 text-xs uppercase tracking-wider font-bold">
                 <tr>
                   <th className="px-6 py-4">Ticket</th>
                   <th className="px-6 py-4">Subject</th>
                   <th className="px-6 py-4">Priority</th>
                   <th className="px-6 py-4">Status</th>
                   <th className="px-6 py-4">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-zinc-100 bg-white">
                 {[
                   { id: 'TCK-092', sub: 'Payout delay inquiry', prio: 'High', status: 'Open' },
                   { id: 'TCK-091', sub: 'Customer no-show dispute', prio: 'Medium', status: 'Pending' },
                   { id: 'TCK-090', sub: 'Menu image upload issue', prio: 'Low', status: 'Resolved' },
                   { id: 'TCK-089', sub: 'Booking synchronization', prio: 'Critical', status: 'Open' }
                 ].map((t, i) => (
                   <tr key={i} className="hover:bg-stone-50">
                     <td className="px-6 py-4 font-mono text-zinc-500 text-xs">{t.id}</td>
                     <td className="px-6 py-4 font-bold text-zinc-900">{t.sub}</td>
                     <td className="px-6 py-4">
                       <span className={`px-2 py-1 text-[10px] font-black uppercase rounded ${t.prio === 'Critical' ? 'bg-rose-100 text-rose-700' : t.prio === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-stone-100 text-stone-600'}`}>{t.prio}</span>
                     </td>
                     <td className="px-6 py-4 font-medium text-zinc-600">{t.status}</td>
                     <td className="px-6 py-4"><button className="text-amber-600 font-bold hover:underline">View</button></td>
                   </tr>
                 ))}
               </tbody>
            </table>
         </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// SETTINGS MODULE
// ─────────────────────────────────────────────────────────────
function SettingsModule() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-8 max-w-[1600px] mx-auto h-full">
      <div className="w-64 shrink-0">
         <h2 className="text-2xl font-black text-zinc-950 mb-6">Settings</h2>
         <div className="space-y-1">
            {['General', 'Platform Config', 'Admin Users', 'Integrations', 'Audit Logs'].map((s, i) => (
               <button key={i} className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold ${i === 0 ? 'bg-white shadow-sm border border-zinc-200 text-amber-600' : 'text-zinc-500 hover:text-zinc-900'}`}>
                  {s}
               </button>
            ))}
         </div>
      </div>
      <div className="flex-1 bg-white rounded-2xl border border-zinc-200 shadow-sm p-8 overflow-y-auto">
         <h3 className="text-lg font-black text-zinc-900 mb-6 border-b border-zinc-100 pb-4">General Platform Settings</h3>
         <div className="max-w-2xl space-y-6">
            <div>
               <label className="block text-sm font-bold text-zinc-700 mb-2">Platform Name</label>
               <input type="text" defaultValue="Table d'Or" className="w-full h-12 px-4 rounded-lg border border-zinc-300 outline-none focus:border-amber-500 bg-stone-50" />
            </div>
            <div>
               <label className="block text-sm font-bold text-zinc-700 mb-2">Support Email</label>
               <input type="email" defaultValue="support@tabledor.com" className="w-full h-12 px-4 rounded-lg border border-zinc-300 outline-none focus:border-amber-500 bg-stone-50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">Default Commission (%)</label>
                  <input type="number" defaultValue={10} className="w-full h-12 px-4 rounded-lg border border-zinc-300 outline-none focus:border-amber-500 bg-stone-50" />
               </div>
               <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">Booking Fee (₹)</label>
                  <input type="number" defaultValue={50} className="w-full h-12 px-4 rounded-lg border border-zinc-300 outline-none focus:border-amber-500 bg-stone-50" />
               </div>
            </div>
            <button className="px-6 py-3 bg-zinc-950 text-white rounded-lg font-bold shadow-sm hover:bg-amber-600 transition">Save Changes</button>
         </div>
      </div>
    </motion.div>
  )
}
