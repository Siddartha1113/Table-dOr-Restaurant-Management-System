const fs = require('fs');
const p = 'src/app/pages/OwnerDashboard.tsx';
let txt = fs.readFileSync(p, 'utf-8');

// 1. Add state for logoUrl
txt = txt.replace(/const \[settingsForm, setSettingsForm\] = useState\(\{ name: "", description: "", street: "" \}\);/, 
  'const [settingsForm, setSettingsForm] = useState({ name: "", description: "", street: "" });\n  const [logoUrl, setLogoUrl] = useState("");');

// 2. Add handleUpdateLogo BEFORE handleUpdateSettings
const settingsHandlerIndex = txt.indexOf('const handleUpdateSettings = async');
if (settingsHandlerIndex !== -1) {
  const logoHandler = `const handleUpdateLogo = async () => {
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
  };\n\n  `;
  txt = txt.substring(0, settingsHandlerIndex) + logoHandler + txt.substring(settingsHandlerIndex);
}

// 3. Add Logo UI Block BEFORE General Information
const genInfoIndex = txt.indexOf('<div className="flex items-center gap-2 mb-6 text-zinc-950 border-b border-zinc-100 pb-4">\n                  <Building2 className="h-6 w-6 text-amber-600" />\n                  <h2 className="text-xl font-bold">General Information</h2>');

if (genInfoIndex !== -1) {
    // Find the start of the surrounding rounded-2xl div
    let startIdx = txt.lastIndexOf('<div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">', genInfoIndex);
    if (startIdx !== -1) {
        const logoBlock = `<div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm mb-6">
                <div className="flex items-center gap-2 mb-6 text-zinc-950 border-b border-zinc-100 pb-4">
                  <ImagePlus className="h-6 w-6 text-amber-600" />
                  <h2 className="text-xl font-bold">Restaurant Logo Image URL</h2>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="h-20 w-20 bg-stone-100 border border-zinc-200 rounded-lg flex-shrink-0 overflow-hidden">
                    {restaurant.photos?.length > 0 ? (
                       <img src={restaurant.photos[0].url.startsWith('http') ? restaurant.photos[0].url : \`http://localhost:5000\${restaurant.photos[0].url}\`} className="w-full h-full object-cover" alt="Logo" />
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
              </div>\n\n              `;
        txt = txt.substring(0, startIdx) + logoBlock + txt.substring(startIdx);
    }
}

fs.writeFileSync(p, txt);
console.log('Success Logo Update');
