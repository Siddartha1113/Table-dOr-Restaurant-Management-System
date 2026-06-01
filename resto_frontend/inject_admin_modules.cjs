const fs = require('fs');

const adminPortalPath = 'd:/TNP MINI PRJ/resto/resto_frontend/src/app/pages/AdminPortal.tsx';
let content = fs.readFileSync(adminPortalPath, 'utf8');

const placeholderBlock = `{activeTab !== 'dashboard' && activeTab !== 'map' && (
            <div className="h-64 rounded-2xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-zinc-400">
               <Settings className="w-8 h-8 mb-4 opacity-50" />
               <p className="font-bold text-lg">{activeTab.toUpperCase()} MODULE IN DEVELOPMENT</p>
            </div>
          )}`;

const replacementTabs = `{activeTab === 'finance' && <FinanceModule restaurants={restaurants} />}
          {activeTab === 'marketing' && <MarketingModule restaurants={restaurants} />}
          {activeTab === 'reservations' && <ReservationsModule restaurants={restaurants} />}
          {activeTab === 'support' && <HelpdeskModule restaurants={restaurants} />}
          {activeTab === 'settings' && <SettingsModule />}`;

if (content.includes(placeholderBlock)) {
    content = content.replace(placeholderBlock, replacementTabs);
}

const additionalModules = `
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
                   const fullImg = imgPath.startsWith('http') ? imgPath : \`http://localhost:5000\${imgPath}\`;
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
                         <span className={\`px-2.5 py-1 text-xs font-bold rounded-full \${i % 3 === 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}\`}>
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
               const fullImg = imgPath.startsWith('http') ? imgPath : \`http://localhost:5000\${imgPath}\`;
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
                   const fullImg = imgPath.startsWith('http') ? imgPath : \`http://localhost:5000\${imgPath}\`;
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
                         <span className={\`px-2.5 py-1 text-xs font-bold rounded-full \${colors[status]}\`}>{status}</span>
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
                       <span className={\`px-2 py-1 text-[10px] font-black uppercase rounded \${t.prio === 'Critical' ? 'bg-rose-100 text-rose-700' : t.prio === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-stone-100 text-stone-600'}\`}>{t.prio}</span>
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
               <button key={i} className={\`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold \${i === 0 ? 'bg-white shadow-sm border border-zinc-200 text-amber-600' : 'text-zinc-500 hover:text-zinc-900'}\`}>
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
`;

if (!content.includes('function FinanceModule')) {
    content = content + additionalModules;
}

fs.writeFileSync(adminPortalPath, content);
console.log('Successfully injected all requested Admin modules!');
