const fs = require('fs');
const p = 'src/app/pages/OwnerDashboard.tsx';
let txt = fs.readFileSync(p, 'utf-8');

// 1. Add settingsForm state
txt = txt.replace(/const \[historyBookings, setHistoryBookings\] = useState<any\[\]>\(\[\]\);/g, 
  'const [historyBookings, setHistoryBookings] = useState<any[]>([]);\n  const [settingsForm, setSettingsForm] = useState({ name: "", description: "", street: "" });');

// 2. Initialize it in fetchRestaurant
txt = txt.replace(/setMenuItems\(res\.data\.restaurant\.menu \|\| \[\]\);/g,
  'setMenuItems(res.data.restaurant.menu || []);\n        setSettingsForm({ name: res.data.restaurant.name || "", description: res.data.restaurant.description || "", street: res.data.restaurant.address?.street || "" });');

// 3. And also local storage fetch (for found)
txt = txt.replace(/setMenuItems\(found\.menu \|\| \[\]\);/g,
  'setMenuItems(found.menu || []);\n          setSettingsForm({ name: found.name || "", description: found.description || "", street: found.address?.street || "" });');

// 4. Add handleUpdateSettings BEFORE handleCreate
const handleCreateIndex = txt.indexOf('const handleCreate = ');
if (handleCreateIndex !== -1) {
  const handler = `const handleUpdateSettings = async (e: React.FormEvent) => {
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
  };\n\n  `;
  txt = txt.substring(0, handleCreateIndex) + handler + txt.substring(handleCreateIndex);
}

// 5. Replace settings tab UI
const settingsTabIndex = txt.indexOf("{activeTab === 'settings' && (");
const nextTabEnd = txt.indexOf('</main>', settingsTabIndex);

if (settingsTabIndex !== -1 && nextTabEnd !== -1) {
  const newSettingsTab = `{activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
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
                    <div key={\`\${photo._id || index}\`} className="group relative overflow-hidden rounded-xl border border-zinc-200/60 aspect-square shadow-sm">
                      <img
                        src={\`http://localhost:5000\${photo.url}\`}
                        alt={photo.caption || \`\${restaurant.name}\`}
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
      `;

  txt = txt.substring(0, settingsTabIndex) + newSettingsTab + '\n      </main>';
}

fs.writeFileSync(p, txt);
console.log('Success settings layout update');
