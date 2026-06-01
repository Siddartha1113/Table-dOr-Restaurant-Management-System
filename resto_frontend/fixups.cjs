const fs = require('fs');
const p = 'src/app/pages/OwnerDashboard.tsx';
let txt = fs.readFileSync(p, 'utf-8');

txt = txt.replace(/Cravora Pro/g, "Table d'Or");
txt = txt.replace(/text-violet-900/g, 'text-zinc-950');
txt = txt.replace(/text-violet-700/g, 'text-amber-800');
txt = txt.replace(/text-violet-600/g, 'text-amber-600');
txt = txt.replace(/text-violet-500/g, 'text-amber-500');
txt = txt.replace(/bg-violet-600/g, 'bg-amber-600');
txt = txt.replace(/bg-violet-700/g, 'bg-amber-700');
txt = txt.replace(/bg-violet-50/g, 'bg-amber-50');
txt = txt.replace(/bg-violet-100/g, 'bg-amber-100');
txt = txt.replace(/border-violet-200/g, 'border-amber-200');
txt = txt.replace(/border-violet-300/g, 'border-amber-300');
txt = txt.replace(/border-violet-400/g, 'border-amber-400');
txt = txt.replace(/hover:border-violet-200/g, 'hover:border-amber-200');
txt = txt.replace(/hover:border-violet-400/g, 'hover:border-amber-400');
txt = txt.replace(/hover:bg-violet-50/g, 'hover:bg-amber-50');
txt = txt.replace(/hover:bg-violet-700/g, 'hover:bg-amber-700');
txt = txt.replace(/hover:text-violet-600/g, 'hover:text-amber-600');
txt = txt.replace(/outline-violet-500/g, 'outline-amber-500');

// Fix Chart Colors
txt = txt.replace(/#8b5cf6/g, '#d97706'); // amber-600

// Fix Logout & remove profile
const idxLogoutStart = txt.indexOf('<div className="border-t border-zinc-100 px-4 py-6">');
const idxLogoutEnd = txt.indexOf('</aside>', idxLogoutStart);
if (idxLogoutStart !== -1 && idxLogoutEnd !== -1) {
  const replacement = `
        <div className="border-t border-zinc-100 px-4 py-6">
          <button 
            onClick={() => { localStorage.removeItem('user'); window.location.href = '/'; }}
            className="flex w-full items-center gap-3 px-2 text-sm font-semibold text-zinc-500 hover:text-rose-600 transition"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </div>
      `;
  txt = txt.substring(0, idxLogoutStart) + replacement + txt.substring(idxLogoutEnd);
}

fs.writeFileSync(p, txt);
console.log("Success");
