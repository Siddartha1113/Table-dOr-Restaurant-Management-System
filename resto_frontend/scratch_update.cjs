const fs = require('fs');
const p = 'd:/TNP MINI PRJ/resto/resto_frontend/src/app/pages/OwnerDashboard.tsx';
let txt = fs.readFileSync(p, 'utf-8');

txt = txt.replace(
  /import \{[\s\S]*?\} from 'lucide-react';/,
  `import {\n  Camera, CheckCircle2, Clock, Edit, ImagePlus, Plus, Save, Trash2, Utensils, Building2, MapPin, BarChart3, LayoutDashboard, ClipboardList, Settings, LogOut, ArrowRight, Activity, CalendarCheck, TrendingUp, Bell, Zap, ShoppingBag\n} from 'lucide-react';`
);

txt = txt.replace(
  /type OwnerTab = 'analytics' \| 'history' \| 'tables' \| 'menu' \| 'photos';/,
  "type OwnerTab = 'dashboard' | 'menu' | 'bookings' | 'analytics' | 'settings';"
);

const newTabMeta = `const tabMeta: Record<OwnerTab, { label: string; icon: React.ElementType }> = {
  dashboard: { label: 'Dashboard', icon: LayoutDashboard },
  menu: { label: 'Manage Menu', icon: Utensils },
  bookings: { label: 'Bookings', icon: ClipboardList },
  analytics: { label: 'Analytics', icon: BarChart3 },
  settings: { label: 'Settings', icon: Settings },
};`;
txt = txt.replace(/const tabMeta: Record<OwnerTab, \{ label: string; icon: React\.ElementType \}> = \{[\s\S]*?\};\n/, newTabMeta + "\n");

txt = txt.replace(/useState<OwnerTab>\('analytics'\)/g, "useState<OwnerTab>('dashboard')");

const idxReturn = txt.indexOf("  return (\n");
if (idxReturn !== -1) {
  const newReturn = `  return (
    <div className="flex h-screen bg-stone-50 font-sans text-zinc-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-20 flex h-full w-64 flex-col border-r border-zinc-200 bg-white">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-zinc-100">
          <div className="flex hidden sm:flex items-center justify-center rounded-lg bg-violet-600 p-2 text-white shadow-sm">
            <Utensils className="h-5 w-5" />
          </div>
          <span className="text-xl font-black text-violet-900">Cravora Pro</span>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6">
          {(Object.keys(tabMeta) as OwnerTab[]).map((tab) => {
            const Icon = tabMeta[tab].icon;
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={\`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition \${
                  active 
                    ? 'bg-violet-50 text-violet-700' 
                    : 'text-zinc-500 hover:bg-stone-50 hover:text-zinc-900'
                }\`}
              >
                <Icon className={\`h-5 w-5 \${active ? 'text-violet-600' : 'text-zinc-400'}\`} />
                {tabMeta[tab].label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-zinc-100 px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
              {restaurant?.owner?.name?.charAt(0)?.toUpperCase() || 'O'}
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-900">{restaurant?.owner?.name || 'Owner'}</div>
              <div className="text-xs text-zinc-500">Owner Portal</div>
            </div>
          </div>
          <button className="flex w-full items-center gap-3 px-2 text-sm font-semibold text-zinc-500 hover:text-rose-600 transition">
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl p-8">
          
          <header className="mb-8 flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-black text-violet-900">
                Welcome back, {restaurant?.owner?.name?.split(' ')[0] || 'Owner'}
              </h1>
              <p className="mt-2 text-sm text-zinc-500">Here's what's happening with your store today.</p>
            </div>
            <button 
              onClick={() => setActiveTab('bookings')}
              className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700"
            >
              View Active Bookings
            </button>
          </header>

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold text-zinc-500">Weekly Revenue</div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-3xl font-bold text-violet-900">{formatRupees(stats?.stats?.totalRevenue || 0)}</div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                      <span className="text-lg font-bold text-emerald-600">₹</span>
                    </div>
                  </div>
                  <div className="mt-3"><span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">Live</span></div>
                </div>

                <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold text-zinc-500">Active Bookings</div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-3xl font-bold text-violet-900">{stats?.slotStatus?.reduce((acc, s)=>acc+s.bookedSeats,0) || 0}</div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                      <Activity className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3"><span className="rounded bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700">processing</span></div>
                </div>

                <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold text-zinc-500">Total Bookings</div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-3xl font-bold text-violet-900">{stats?.stats?.totalConfirmedAllTime || 0}</div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3"><span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">overall</span></div>
                </div>

                <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold text-zinc-500">Today's Bookings</div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-3xl font-bold text-violet-900">{stats?.stats?.todayBookings || 0}</div>
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
                    <h3 className="text-lg font-bold text-violet-900">Revenue Overview</h3>
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
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Area type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
                    <h3 className="mb-4 text-lg font-bold text-violet-900">Quick Actions</h3>
                    <div className="grid gap-3">
                      <button onClick={() => setActiveTab('menu')} className="group flex w-full items-center justify-between rounded-xl border border-zinc-100 bg-stone-50 p-4 transition-all hover:border-violet-200 hover:bg-violet-50">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm text-violet-600">
                            <Utensils className="h-5 w-5" />
                          </div>
                          <span className="font-semibold text-zinc-700">Manage Menu</span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-zinc-400 group-hover:text-violet-600" />
                      </button>
                      <button onClick={() => setActiveTab('analytics')} className="group flex w-full items-center justify-between rounded-xl border border-zinc-100 bg-stone-50 p-4 transition-all hover:border-violet-200 hover:bg-violet-50">
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
                    <h2 className="text-2xl font-black text-violet-900">Manage Menu</h2>
                    <p className="text-sm text-zinc-500">Customer pages will show these prices in rupees.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addMenuItem}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-violet-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Item
                  </button>
                </div>

                <div className="grid gap-3">
                  {menuItems.map((item) => (
                    <div
                      key={item._id || item.name}
                      className="grid gap-4 rounded-xl border border-zinc-100 p-4 sm:grid-cols-[auto_1fr_auto_auto] sm:items-center bg-stone-50/50 hover:border-violet-200 transition"
                    >
                      <div className="relative h-16 w-16 overflow-hidden rounded-md bg-zinc-200 border border-zinc-200 shadow-sm">
                        {item.image ? (
                          <img src={\`http://localhost:5000\${item.image}\`} alt={item.name} className="h-full w-full object-cover" />
                        ) : (
                          <Utensils className="h-6 w-6 absolute inset-0 m-auto text-zinc-400" />
                        )}
                        <label className="cursor-pointer absolute inset-0 grid place-items-center bg-black/0 hover:bg-black/40 transition text-transparent hover:text-white">
                           <Camera className="h-5 w-5" />
                           <input type="file" className="hidden" accept="image/*" onChange={(e) => uploadMenuPhoto(e, item._id)} />
                        </label>
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-900">{item.name}</h3>
                        <p className="text-sm text-zinc-500">{item.description || 'Restaurant menu item'}</p>
                      </div>
                      <div className="font-bold text-violet-700">{formatRupees(item.price)}</div>
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
                    <h2 className="text-2xl font-black text-violet-900">Table Status</h2>
                    <p className="text-sm text-zinc-500">Overview of upcoming slots for today.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {stats?.slotStatus?.map((slot: any) => (
                    <div key={slot.time} className="rounded-xl border border-zinc-100 p-4 transition-all hover:border-violet-300 hover:shadow-md bg-stone-50/50">
                      <div className="flex items-center gap-3 border-b border-zinc-200/50 pb-3">
                        <div className="text-lg font-bold text-zinc-900">{slot.time}</div>
                        <div className="rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-violet-700">
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
                  <h2 className="text-2xl font-black text-violet-900">Booking History</h2>
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
                            <span className={\`inline-flex rounded-full px-2.5 py-1 text-xs font-bold \${
                              booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                              booking.status === 'cancelled' ? 'bg-rose-100 text-rose-700' :
                              'bg-amber-100 text-amber-700'
                            }\`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-violet-700">
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
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm text-center py-20 text-zinc-500 font-semibold">
              Full Analytics view is available on the Dashboard tab while we update this dedicated view!
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-violet-900">Photos</h2>
                    <p className="text-sm text-zinc-500">Images used on cuisine, listing, and restaurant pages.</p>
                  </div>
                  <label htmlFor="photo-upload" className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700">
                    <ImagePlus className="h-4 w-4" />
                    Upload Photo
                    <input type="file" id="photo-upload" className="hidden" accept="image/*" onChange={uploadPhoto} />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {restaurant.photos?.map((photo: any, index: number) => (
                    <div key={\`\${photo._id || index}\`} className="group relative overflow-hidden rounded-xl border border-zinc-200/60 aspect-square shadow-sm">
                      <img
                        src={\`http://localhost:5000\${photo.url}\`}
                        alt={photo.caption || \`\${restaurant.name}\`}
                        className="h-full w-full object-cover"
                        onError={(e: any) => { e.target.src = photo.url }}
                      />
                      {index === 0 && (
                        <div className="absolute left-2 top-2 rounded-md bg-amber-500 px-2 py-1 text-xs font-black text-white shadow">
                          Profile Photo
                        </div>
                      )}
                      <div className="absolute inset-x-2 bottom-2 flex gap-2 opacity-0 transition group-hover:opacity-100">
                        {index > 0 && (
                           <button onClick={() => setPrimaryPhoto(photo._id)} className="flex-1 rounded-lg bg-white/95 py-1.5 text-xs font-bold text-zinc-900 shadow hover:bg-white hover:text-violet-600 transition">
                             Set Profile
                           </button>
                        )}
                      </div>
                      <button onClick={() => deletePhoto(photo._id)} className="absolute right-2 top-2 rounded-lg bg-white p-2 text-rose-600 opacity-0 shadow-sm transition group-hover:opacity-100 hover:bg-rose-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <label htmlFor="photo-upload" className="cursor-pointer grid aspect-square place-items-center rounded-xl border-2 border-dashed border-zinc-200 bg-stone-50 text-center text-zinc-400 hover:border-violet-400 transition hover:bg-violet-50 hover:text-violet-600">
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
`;
  txt = txt.substring(0, idxReturn) + newReturn;
  fs.writeFileSync(p, txt);
}
